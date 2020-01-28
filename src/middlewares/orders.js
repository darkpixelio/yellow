import { getAllOrders, getOrdersByDate, generateXLSX } from '../helper'

const getOrdersMiddleware = async (req, res, next) => {
  const shop = res.locals.shop
  const token = res.locals.token
  try {
    const orders = await getAllOrders(shop, token, null)
    let filteredOrder = []
    for(let item of orders) {
      let draft = {}
      let order = item.node

      draft['id'] = order.id
      draft['name'] = order.name
      draft['created_at'] = new Date(order.createdAt).toDateString()
      draft['customer'] = {}
      draft['customer']['first_name'] = order.customer ? order.customer.firstName : 'No'
      draft['customer']['last_name'] = order.customer ? order.customer.lastName : 'Customer'
      draft['total_price'] = order.totalPriceSet.shopMoney.amount
      draft['fulfilled_by'] = !order.metafield ? null : order.metafield.value
      draft['metafield_id'] = !order.metafield ? null : order.metafield.id
      draft['fulfillment_status'] = order.displayFulfillmentStatus
      draft['payment_status'] = order.displayFinancialStatus
      let activeFulfillment = order.fulfillments.find(item => item.status === 'SUCCESS')
      draft['fulfillment_order_id'] = !activeFulfillment ? null : activeFulfillment.id

      filteredOrder.push(draft)
    }
    res.locals.orders = filteredOrder
    next()
  }
  catch(e) {
    if(e) return res.status(400).send('Something went wrong')
  }
}

const generateReport = async (req, res, next) => {
  const shop = res.locals.shop
  const token = res.locals.token
  const query = {
    start: req.body.startDate,
    end: req.body.endDate
  }
  if(!req.body.startDate || !req.body.endDate) {
    try {
      const orders = await getAllOrders(shop, token, null)
      const file = await generateXLSX(orders)
      res.locals.exportedFile = file
      next()
    }
    catch(e) {
      console.log(e)
    }
  }
  else {
    try {
      const orders = await getOrdersByDate(shop, token, query)
      const file = await generateXLSX(orders)
      res.locals.exportedFile = file
      next()
    }
    catch(e) {
      console.log(e)
    }
  }
}

export { generateReport, getOrdersMiddleware }