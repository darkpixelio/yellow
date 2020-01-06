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
const scopes = 'write_merchant_managed_fulfillment_orders, read_merchant_managed_fulfillment_orders, read_fulfillments, write_fulfillments, read_orders, write_orders, read_draft_orders, write_draft_orders, read_customers, write_customers, write_assigned_fulfillment_orders, read_assigned_fulfillment_orders, read_products, write_products'

const forwardingAddress = 'https://yellow-report.herokuapp.com'
// const forwardingAddress = 'https://d739a451.ngrok.io'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile()
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


    res.cookie('token', token)
    res.cookie('shop', shop)
    res.redirect('/')
  }
  else {
    res.status(400).send('Required parameter missing')
  }
})

app.get('/generate-report', (req, res) => {

  const shop = cookie.parse(req.headers.cookie).shop
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
    console.log(data.orders.edges)
    for(let item of data.orders.edges) {
      let order = item.node
      console.log(order.metafield)


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
        reportObject["Fulllment Status"] = !order.metafield ? "Unfulfilled" : order.metafield.value
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
      res.json({ download_link: `/public/exports/report_${date}.xlsx` })
    })
  })
  .catch(e => {
    console.log(e)
  })

})

app.post('/save', (req, res) => {
  const token = cookie.parse(req.headers.cookie).token
  const shop = cookie.parse(req.headers.cookie).shop
  const reqBody = req.body

  const vars = {
    locationId: "gid://shopify/Location/32102449231",
    orderId: reqBody.order_id,
    fulfillmentValue: reqBody.fulfillment_by,
    metafield_id: reqBody.fulfillment_id,
    fulfillment_order_id: reqBody.fulfillment_order_id
  }

  const fulfillmentCreateMutation = `
    fulfillmentCreate(input: {
      orderId: "${vars.orderId}"
      locationId: "${vars.locationId}"
    }) {
      fulfillment {
        id
        name
        status
      }
    }
  `

  const fulfilmentClose = `
  fulfillmentCancel(id: "${vars.fulfillment_order_id}") {
      fulfillment {
      id
    }
  }
  `

  const gqlQuery = `
  mutation {
    ${ vars.fulfillmentValue != 'Unfulfilled' ? fulfillmentCreateMutation : fulfilmentClose }
    orderUpdate(input: {
      id: "${vars.orderId}",
      metafields: {
        id: ${!vars.metafield_id ? null : `"${vars.metafield_id}"`},
        namespace: "fulfillment_service",
        key: "fulfillment_by",
        value: "${vars.fulfillmentValue}",
        valueType: STRING
      }
    }) {
      order {
        id
        name
        createdAt
        customer{
          firstName
          lastName
        }
        displayFinancialStatus
        displayFulfillmentStatus
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        fulfillments{
          id
          status
        }
        metafield(
          namespace: "fulfillment_service",
          key: "fulfillment_by",
        ) {
          id
          value
        }
      }
    }
  }
  `
  console.log(gqlQuery)
  const reqHeaders = {
    'X-Shopify-Access-Token': token
  }
  const reqUrl = `https://${shop}/admin/api/2020-01/graphql.json`
  const client = new GraphQLClient(reqUrl, { headers: reqHeaders })

  client.request(gqlQuery)
  .then(data => {
    console.log(data.orderUpdate.order.metafield)
    res.json(data)
  })
  .catch(e => console.log(e))
})

app.get('/get-orders', (req, res) => {
  // console.log(req.headers)
  const shop = cookie.parse(req.headers.cookie).shop
  const token = cookie.parse(req.headers.cookie).token

  const orderRequestUrl = `https://${shop}/admin/api/2020-01/graphql.json`
    const orderRequestHeader = {
      'X-Shopify-Access-Token': token
    }

    let gqlQuery = `
    query {
      orders(first: 20) {
        edges {
          cursor,
          node {
            id,
            name,
            createdAt,
            displayFinancialStatus
            displayFulfillmentStatus
            customer {
              firstName,
              lastName
            }
            fulfillments{
              id
              status
            }
            email,
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              id
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
    let orders = []
    const client = new GraphQLClient(orderRequestUrl, { headers: orderRequestHeader })
    client.request(gqlQuery)
    .then(data => {
      for(let item of data.orders.edges) {
        let draft = {}
        let order = item.node
        console.log(order)
        draft['id'] = order.id
        draft['name'] = order.name
        draft['created_at'] = order.createdAt
        draft['customer'] = {}
        draft['customer']['first_name'] = order.customer.firstName
        draft['customer']['last_name'] = order.customer.lastName
        draft['total_price'] = order.totalPriceSet.shopMoney.amount
        draft['fulfilled_by'] = !order.metafield ? '' : order.metafield.value
        draft['fulfillment_id'] = !order.metafield ? null : order.metafield.id
        draft['fulfillment_status'] = order.displayFulfillmentStatus
        draft['payment_status'] = order.displayFinancialStatus
        let activeFulfillment = order.fulfillments.find(item => item.status === 'SUCCESS')
        draft['fulfillment_order_id'] = !activeFulfillment ? null : activeFulfillment.id

        orders.push(draft)
      }
      res.json(orders)
    })
    .catch(e => {
      console.log(e)
    })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})