import { gqlMutations } from '../graphql'
import { updateFulfilledBy, getLocation, updateOrderStatus } from '../helper'

const updateFulfillment = async (req, res, next) => {
  const shop = res.locals.shop
  const token = res.locals.token
  let data = req.body

  try {
    const location = await getLocation(shop, token)
    data = { ...data, location }

    const fulfillmentCreate = gqlMutations.fulfillmentCreate(data)
    const fulfillmentClose = gqlMutations.fulfillmentClose(data)
    const mutation = gqlMutations.courierUpdate(data, fulfillmentCreate, fulfillmentClose)
    const updateCourier = await updateFulfilledBy(shop, token, mutation)
    
    const updateResponse = {}
    updateResponse['fulfillment_status'] = updateCourier.orderUpdate.order.displayFulfillmentStatus
    updateResponse['fulfilled_by'] = updateCourier.orderUpdate.order.metafield.value
    let activeFulfillment = updateCourier.orderUpdate.order.fulfillments.find(item => item.status === 'SUCCESS')
    updateResponse['fulfillment_order_id'] = !activeFulfillment ? null : activeFulfillment.id

    res.locals.__update = updateResponse
    next()
  }
  catch(e) {
    console.log(e)
  }
}

const updateOrderStatus = (req, res, next) => {
  const shop = res.locals.shop
  const token = res.locals.token
  let data = req.body

  let mutation = gqlMutations.statusUpdate(data)
  
  try {
    let updateResponse = await updateOrderStatus(shop, token, mutation)
    res.locals.__update = updateResponse
    next()
  }
  catch(e) {
    console.log(e)
  }
}

export { updateFulfillment, updateOrderStatus }