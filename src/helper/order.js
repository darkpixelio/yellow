import request from 'request-promise'
import { GraphQLClient } from 'graphql-request'

import { gqlQuery } from '../graphql'

const getAllOrders = async (shop, token, query) => {
  return new Promise(async (resolve, reject) => {
    if(!shop || !token) reject({ message: 'getOrdersByDate function expect shop & token parameter' })
    try {
      let ordersArray = []
      const requestObject = {
        url: `https://${shop}/admin/api/2020-01/graphql.json`,
        headers: {
          'X-Shopify-Access-Token': token
        }
      }
      const client = new GraphQLClient(requestObject.url, { headers: requestObject.headers })
      let cursor

      while(true) {
        let orderQuery = gqlQuery.fetchAllOrder(cursor)
        const response = await client.request(orderQuery)

        if(response.orders.edges.length === 0) break
        
        response.orders.edges.forEach((item, i) => {
          if(i == response.orders.edges.length - 1) cursor = item.cursor
          ordersArray.push(item)
        })
      }
      resolve(ordersArray)
    }
    catch(e) {
      console.log(e)
      if(e) reject(e)
    }    
  })
}

const getOrdersByDate = (shop, token, query) => {
  return new Promise(async (resolve, reject) => {
    if(!query) reject({ message: `getOrdersByDate function expect query parameter but receive ${query}` })
    if(!shop || !token) reject({ message: 'getOrdersByDate function expect shop & token parameter' })

    try {
      let ordersArray = []
      const requestObject = {
        url: `https://${shop}/admin/api/2020-01/graphql.json`,
        headers: {
          'X-Shopify-Access-Token': token
        }
      }
      const client = new GraphQLClient(requestObject.url, { headers: requestObject.headers })
      let cursor
      while(true) {
        let orderQuery = gqlQuery.fetchOrderByDate(cursor, query)
        const response = await client.request(orderQuery)

        if(response.orders.edges.length === 0) break
        
        response.orders.edges.forEach((item, i) => {
          if(i == response.orders.edges.length - 1) cursor = item.cursor
          ordersArray.push(item)
        })
      }
      resolve(ordersArray)
    }
    catch(e) {
      console.log(e)
    }
  })
}

export { getAllOrders, getOrdersByDate }