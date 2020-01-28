import express from 'express'

import installRoutes from './install'
import ordersRoutes from './orders'
import fulfillmentRoutes from './fulfillment'

const router = express.Router()

router.use('/install', installRoutes)
router.use('/orders', ordersRoutes)
router.use('/fulfillment', fulfillmentRoutes)

router.get('/', (req, res) => {
  res.status(200).render('index')
})

export default router