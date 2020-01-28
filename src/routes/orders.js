import express from 'express'
import { verifyShop, getOrdersMiddleware, generateReport } from '../middlewares'

const router = express.Router()

router.get('/get-orders', verifyShop, getOrdersMiddleware, (req, res) => {
  let orders = res.locals.orders
  res.status(200).json(orders)
})

router.post('/generate-report', verifyShop, generateReport, (req, res) => {
  let file = res.locals.exportedFile
  res.status(200).json(file)
})

export default router