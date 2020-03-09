import express from 'express'
import cookie from 'cookie'
import nonce from 'nonce'

import { key, scopes, uri } from '../config'

import { verifyOrigin, validateRequest, generateToken } from '../middlewares'

const router = express.Router()

router.get('/', (req, res) => {
  const shop = req.query.shop

  if(!shop) return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request')

  const state = nonce()()
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${key}&scope=${scopes}&state=${state}&redirect_uri=${uri}/install/callback`

  res.cookie('state', state, { sameSite: 'none', secure: true })
  res.redirect(installUrl)
})

router.get('/callback', verifyOrigin, validateRequest, generateToken, (req, res) => {
  const { shop, token } = res.locals

  res.cookie('shop', shop, { sameSite: 'none', secure: true })
  res.cookie('token', token, { sameSite: 'none', secure: true })
  res.redirect('/')
})

export default router