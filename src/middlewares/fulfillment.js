import { gqlMutations } from '../graphql'
import { updateFulfilledBy, getLocation } from '../helper'

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

    // find metafields
    let metafields = updateCourier.orderUpdate.order.metafields.edges
    let orderStatus = metafields.find(item => item.node.key == 'order_status')
    let fulfillment_by = metafields.find(item => item.node.key == 'fulfillment_by')

    // set fulfilled_by metafield
    updateResponse['fulfilled_by'] = !fulfillment_by ? null : fulfillment_by.node.value
    updateResponse['fulfilled_by_id'] = !fulfillment_by ? null : fulfillment_by.node.id

    // set order status metafield
    updateResponse['order_status'] = !orderStatus ? null : orderStatus.node.value
    updateResponse['order_status_id'] = !orderStatus ? null : orderStatus.node.id

    // set fulfillment info
    updateResponse['fulfillment_status'] = updateCourier.orderUpdate.order.displayFulfillmentStatus
    let activeFulfillment = updateCourier.orderUpdate.order.fulfillments.find(item => item.status === 'SUCCESS')
    updateResponse['fulfillment_order_id'] = !activeFulfillment ? null : activeFulfillment.id

    res.locals.__update = updateResponse
    next()
  }
  catch(e) {
    console.log(e)
  }
}

export { updateFulfillment }