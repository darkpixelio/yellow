import express from 'express'
import path from 'path'

import installRoutes from './install'
import ordersRoutes from './orders'
import fulfillmentRoutes from './fulfillment'

const router = express.Router()

router.use('/install', installRoutes)
router.use('/orders', ordersRoutes)
router.use('/fulfillment', fulfillmentRoutes)

router.get('/', (req, res) => {

  res.status(200).sendFile(path.join(__dirname, '../assets/index.html'))

})

export default router