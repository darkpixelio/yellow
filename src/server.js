// Import necessary modules
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cookie from 'cookie'
import crypto from 'crypto'
import nonce from 'nonce'
import querystring from 'querystring'
import request from 'request-promise'

// Initialize necessary modules
dotenv.config()
const app = express()

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Set the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Initialize necessary veriables
const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET
const scopes = 'read_orders, write_orders, read_draft_orders, write_draft_orders'
const forwardingAddress = 'https://f15b639b.ngrok.io'

app.get('/', (req, res) => {
  if(req.query.orders) {
    
    res.render('index', {orders: req.query.orders})
  }
  else {
    res.send('Welcome to the yellow app')
  }
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
  console.log(req.query)
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
    
    const orderRequestUrl = `https://${shop}/admin/api/2019-10/orders.json`
    const orderRequestHeader = {
      'X-Shopify-Access-Token': token
    }

    request.get(orderRequestUrl, { headers: orderRequestHeader }).then(orders => {
      console.log(JSON.parse(orders))
      res.render('index', {orders: orders})
    })
    .catch(e => {
      console.log(e)
    })
  }
  else {
    res.status(400).send('Required parameter missing')
  }
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})