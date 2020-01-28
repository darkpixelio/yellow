const getAllOrders = (cursor) => {
  if(!cursor) {
    return `query {
      orders(first: 100) {
        edges {
          cursor,
          node {
            id,
            name,
            email,
            displayFinancialStatus,
            displayFulfillmentStatus,
            createdAt,
            customer {
              firstName,
              lastName
            },
            fulfillments {
              id,
              status
            },
            transactions(first: 110) {
              accountNumber,
              amountSet {
                presentmentMoney {
                  amount,
                  currencyCode
                }
                shopMoney {
                  amount,
                  currencyCode
                }
              }
              authorizationCode,
              createdAt,
              errorCode,
              formattedGateway,
              gateway,
              id,
              kind,
              status,
              order {
                id,
                name
              }
            },
            totalPriceSet {
              shopMoney {
                amount
              }
              presentmentMoney {
                amount
              }
            }
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              id,
              value
            }
          }
        }
      }
    }`
  }
  else {
    return `query {
      orders(after: "${cursor}", first: 100) {
        edges {
          cursor,
          node {
            id,
            name,
            email,
            displayFinancialStatus,
            displayFulfillmentStatus,
            createdAt,
            customer {
              firstName,
              lastName
            },
            fulfillments {
              id,
              status
            },
            transactions(first: 100) {
              accountNumber,
              amountSet {
                presentmentMoney {
                  amount,
                  currencyCode
                }
                shopMoney {
                  amount,
                  currencyCode
                }
              }
              authorizationCode,
              createdAt,
              errorCode,
              formattedGateway,
              gateway,
              id,
              kind,
              status,
              order {
                id,
                name
              }
            },
            totalPriceSet {
              shopMoney {
                amount
              }
              presentmentMoney {
                amount
              }
            }
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              id,
              value
            }
          }
        }
      }
    }`
  }
}

const getOrdersByDate = (cursor, query) => {
  if(!query) throw new Error('query parameter must be needed')
  let dateQuery = {
    start: new Date(new Date(query.start).getTime() + (60 * 60 * 6 * 1000)),
    end: new Date(new Date(query.end).getTime() + ((60 * 60 * 24 * 1000) + (60 * 60 * 6 * 1000)))
  }
  let formattedQuery = {
    start: `${dateQuery.start.getFullYear()}-${dateQuery.start.getMonth() + 1}-${dateQuery.start.getDate()}`,
    end: `${dateQuery.end.getFullYear()}-${dateQuery.end.getMonth() + 1}-${dateQuery.end.getDate()}`
  }

  if(!cursor) {
    return `query {
      orders(first: 100, query:"created_at:>${formattedQuery.start} created_at:<${formattedQuery.end}") {
        edges {
          cursor,
          node {
            id,
            email,
            transactions(first: 50) {
              accountNumber,
              amountSet {
                presentmentMoney {
                  amount
                  currencyCode
                }
                shopMoney {
                  amount
                  currencyCode
                }
              }
              authorizationCode
              createdAt
              errorCode
              formattedGateway
              gateway
              id
              kind
              status
              order {
                id
                name
              }
            }
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              value
            }
          }
        }
      }
    }`
  }
  else {
    return `query {
      orders(after: "${cursor}", first: 100, query:"created_at:>${formattedQuery.start} created_at:<${formattedQuery.end}") {
        edges {
          cursor,
          node {
            id,
            email,
            transactions(first: 50) {
              accountNumber,
              amountSet {
                presentmentMoney {
                  amount
                  currencyCode
                }
                shopMoney {
                  amount
                  currencyCode
                }
              }
              authorizationCode
              createdAt
              errorCode
              formattedGateway
              gateway
              id
              kind
              status
              order {
                id
                name
              }
            }
            metafield(namespace: "fulfillment_service", key: "fulfillment_by") {
              value
            }
          }
        }
      }
    }`
  }
}

export { getAllOrders, getOrdersByDate }