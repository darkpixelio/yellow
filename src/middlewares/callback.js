import cookie from 'cookie'

import { verifyHmac, getAccessToken } from '../helper'

const verifyOrigin = (req, res, next) => {
  const state = req.query.state
  const stateCookie = cookie.parse(req.headers.cookie).state

  if(state !== stateCookie) return res.status(403).send('Request origin cannot be verified')

  next()
}

const validateRequest = async (req, res, next) => {
  const { shop, hmac, code } = req.query

  if(!shop && !hmac && !code) return res.status(400).send('Required parameter missing')

  const valid = await verifyHmac(req, hmac)

  if(!valid) return res.status(400).send('HMAC validation failed')

  next()
}

const generateToken = async (req, res, next) => {
  const {shop, code} = req.query

  const token = await getAccessToken(shop, code)

  res.locals.token = token
  res.locals.shop = shop
  next()
}

export { verifyOrigin, validateRequest, generateToken }