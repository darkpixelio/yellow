import express from 'express'
import { verifyShop, updateFulfillment } from '../middlewares'

const router = express.Router()

router.post('/set-courier', verifyShop, updateFulfillment, (req, res) => {
  res.status(200).json(res.locals.__update)
})

export default router