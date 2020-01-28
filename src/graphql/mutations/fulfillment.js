const metafieldUpdate = (data, fulfillmentCreate, fulfillmentClose) => {
  return `mutation {
    ${ data.fulfilled_by_courier != 'Unfulfilled' ? fulfillmentCreate : fulfillmentClose }
    orderUpdate(input: {
      id: "${data.id}",
      metafields: {
        id: ${!data.metafield_id ? null : `"${data.metafield_id}"`},
        namespace: "fulfillment_service",
        key: "fulfillment_by",
        value: "${data.fulfilled_by_courier}",
        valueType: STRING
      }
    }) {
      order {
        id
        name
        createdAt
        customer{
          firstName
          lastName
        }
        displayFinancialStatus
        displayFulfillmentStatus
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        fulfillments{
          id
          status
        }
        metafield(
          namespace: "fulfillment_service",
          key: "fulfillment_by",
        ) {
          id
          value
        }
      }
    }
  }
  `
}

const fulfillmentCreateMutation = data => {
  return `fulfillmentCreate(input: {
    orderId: "${data.id}"
    locationId: "${data.location.id}"
  }) {
    fulfillment {
      id
      name
      status
    }
  }
  `
}

const fulfilmentCloseMutation = data => {
  return `fulfillmentCancel(id: "${data.fulfillment_order_id}") {
      fulfillment {
      id
    }
  }
  `
}

export { metafieldUpdate, fulfillmentCreateMutation, fulfilmentCloseMutation }