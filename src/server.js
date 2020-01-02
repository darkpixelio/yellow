// Import necessary modules
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookie from 'cookie'
import crypto from 'crypto'
import nonce from 'nonce'
import querystring from 'querystring'
import request from 'request-promise'
import { GraphQLClient } from 'graphql-request'
import XLSX from 'xlsx'

// Initialize necessary modules
dotenv.config()
const app = express()

// Use CORS
app.use(cors())
// Body Parser for form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Set the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Initialize necessary veriables
const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET
const scopes = 'read_orders, write_orders, read_draft_orders, write_draft_orders, read_customers, write_customers'
const forwardingAddress = 'https://yellow-report.herokuapp.com'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/install', (req, res) => {
  const shop = req.query.shop
  if(shop) {
    const state = nonce()()
    const redirectUri = `${forwardingAddress}/install/callback`
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`

    res.cookie('state', state)
    res.redirect(installUrl)
  }
  else {
    return res.status(400).send('Missing shop parameter')
  }
})

app.get('/install/callback', async (req, res) => {
  const { shop, hmac, code, state } = req.query
  const stateCookie = cookie.parse(req.headers.cookie).state

  if(state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified')
  }

  if(shop && hmac && code) {
    const map = Object.assign({}, req.query)
    delete map['signature']
    delete map['hmac']

    const message = querystring.stringify(map)
    const providedHmac = Buffer.from(hmac, 'utf-8')
    const generatedHash = Buffer.from(
      crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex'),
      'utf-8'
    )
    let hashEquals = false

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    }
    catch (e) {
      hashEquals = false
    }

    if (!hashEquals) return res.status(400).send('HMAC validation failed')

    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    }

    const tokenResponse = await request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    const token = tokenResponse.access_token
    
    const orderRequestUrl = `https://${shop}/admin/api/2020-01/graphql.json`
    const orderRequestHeader = {
      'X-Shopify-Access-Token': token
    }

    let gqlQuery = `
    query {
      orders(first: 10) {
        edges {
          cursor,
          node {
            id,
            name,
            createdAt,
            customer {
              firstName,
              lastName
            }
            fulfillments {
              status
            }
            email,
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              value
            }
            totalPriceSet {
              shopMoney {
                amount
              }
              presentmentMoney {
                amount
              }
            }
          }
        }
      }
    }
    `
    let orderArray = []
    const client = new GraphQLClient(orderRequestUrl, { headers: orderRequestHeader })
    client.request(gqlQuery)
    .then(data => {
      console.log(data)
      for(let item of data.orders.edges) {
        let draft = {}
        let order = item.node

        draft['id'] = order.id.split('/').slice(-1)[0]
        draft['name'] = order.name
        draft['created_at'] = order.name
        draft['customer'] = {}
        draft['customer']['first_name'] = order.customer.firstName
        draft['customer']['last_name'] = order.customer.lastName
        draft['fulfillment_status'] = !order.fulfillments[0] ? null : order.fulfillments[0].status
        draft['total_price'] = order.totalPriceSet.shopMoney.amount
        draft['fulfilled_by'] = !order.metafield.value ? '' : order.metafield.value

        orderArray.push(draft)
      }

      res.cookie('token', token)
      
      res.render('index', {orders: orderArray})
    })
    .catch(e => {
      console.log(e)
      res.json({ error: e })
    })
  }
  else {
    res.status(400).send('Required parameter missing')
  }
})

app.post('/save', (req, res) => {
  const token = cookie.parse(req.headers.cookie).token
  const shop = querystring.parse(req.headers.referer).shop
  const reqBody = req.body
  console.log(reqBody)
  const reqHeaders = {
    'X-Shopify-Access-Token': token
  }
  let reqUrl = `https://${shop}/admin/api/2019-10/orders/${reqBody.order_id}/metafields.json`
  let payload = {
    "metafield": {
      "namespace": "fulfillment_service",
      "key": "fulfillment_by",
      "value": `${reqBody.fulfillment_by}`,
      "value_type": "string"
    }
  }
  request.post(reqUrl, { headers: reqHeaders, body: payload, json: true })
  .then(response => {
    console.log(response)
    res.json(response)
  })
  .catch(e => {
    console.log(e)
  })
})

app.get('/generate-report', (req, res) => {
  
  const shop = querystring.parse(req.headers.referer).shop
  console.log(shop)
  const token = cookie.parse(req.headers.cookie).token

  let orderRequestUrl = `https://${shop}/admin/api/2020-01/graphql.json`
  let gqlQuery = `
  query {
    orders(first: 100) {
      edges {
        cursor,
        node {
          id,
          email,
          transactions(first: 100) {
            accountNumber,
            amountSet {
              presentmentMoney {
                amount
                currencyCode
              }
              shopMoney {
                amount
                currencyCode
              }
            }
            authorizationCode
            createdAt
            errorCode
            formattedGateway
            gateway
            id
            kind
            status
            order {
              id
              name
            }
            
          }
          metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
            value
          }
        }
      }
    }
  }
  `
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token
    },
    body: JSON.stringify({gqlQuery})
  }
  const reportArray = []
  const client = new GraphQLClient(orderRequestUrl, { headers: { 'X-Shopify-Access-Token': token } })
  client.request(gqlQuery)
  .then(data => {
    console.log(data)
    for(let item of data.orders.edges) {
      let order = item.node
      

      for(let transaction of order.transactions) {
        let reportObject = {}
        reportObject["Order"] = transaction.order.id.split('/').slice(-1)[0]
        reportObject["Name"] = transaction.order.name
        reportObject["Created At"] = transaction.createdAt
        reportObject["Amount"] = transaction.amountSet.shopMoney.amount
        reportObject["Currency"] = transaction.amountSet.shopMoney.currencyCode
        reportObject["Gateway"] = transaction.gateway
        reportObject["Card Type"] = ""
        reportObject["Payment Status"] = transaction.status
        reportObject["Fulllment Status"] = order.metafield.value
        reportObject["Retrun/Refund Amount"] = ""
        reportObject["Delivery charge"] = ""
        reportObject["Cash collection charge"] = ""
        reportObject["Deposit amount"] = ""
        reportObject["courier payment reference"] = ""
        reportObject["Consigmnent ID"] = ""
        reportObject["Transaction ID"] = transaction.id.split('/').slice(-1)[0]

        reportArray.push(reportObject)
      }
    }
    console.log(reportArray)
    let ws = XLSX.utils.json_to_sheet(reportArray, { })
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Report')
    let date = Date.now()

    XLSX.writeFileAsync(`./src/public/exports/report_${date}.xlsx`, wb, success => {
      res.json({ download_link: `/exports/report_${date}.xlsx` })
    })
  })
  .catch(e => {
    console.log(e)
  })

})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})