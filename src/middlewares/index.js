import cookie from 'cookie'

import { verifyOrigin, validateRequest, generateToken } from './callback'
import { getOrdersMiddleware, generateReport } from './orders'
import { updateFulfillment, updateOrderStatus } from './fulfillment'

const verifyShop = (req, res, next) => {
  let shop = cookie.parse(req.headers.cookie).shop
  let token = cookie.parse(req.headers.cookie).token

  res.locals.shop = shop
  res.locals.token = token

  if(!shop && !token) return res.status(400).send('Something went wrong! Please reload the app')
  next()
}

const setCookie = (req, res, next) => {
  res.cookie({ sameSite: 'none', secure: true })
  next()
}

export {
  verifyShop,
  verifyOrigin,
  validateRequest,
  generateToken,
  getOrdersMiddleware,
  generateReport,
  updateFulfillment,
  updateOrderStatus,
  setCookie
}