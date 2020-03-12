import { getAllOrders, getOrdersByDate } from './queries/order'
import { getLocation } from './queries/location'
import { metafieldUpdate, fulfillmentCreateMutation, fulfilmentCloseMutation, orderStatusUpdate } from './mutations/fulfillment'

const gqlQuery = {
  fetchAllOrder: getAllOrders,
  fetchOrderByDate: getOrdersByDate,
  getLocation: getLocation
}

const gqlMutations = {
  courierUpdate: metafieldUpdate,
  fulfillmentCreate: fulfillmentCreateMutation,
  fulfillmentClose: fulfilmentCloseMutation,
  statusUpdate: orderStatusUpdate
}

export { gqlQuery, gqlMutations }