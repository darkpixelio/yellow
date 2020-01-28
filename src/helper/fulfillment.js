import { GraphQLClient } from 'graphql-request'
import { gqlQuery } from '../graphql'

const updateFulfilledBy = (shop, token, mutation) => {
  return new Promise(async (resolve, reject) => {
    const requestUrl = `https://${shop}/admin/api/2020-01/graphql.json`
    const requestHeaders = {
      'X-Shopify-Access-Token': token
    }

    const client = new GraphQLClient(requestUrl, { headers: requestHeaders })

    try {
      const response = await client.request(mutation)
      resolve(response)
    }
    catch(e) {
      reject(e)
    }
  })
}

const getLocation = (shop, token) => {
  return new Promise(async (resolve, reject) => {
    const requestUrl = `https://${shop}/admin/api/2020-01/graphql.json`
    const requestHeaders = {
      'X-Shopify-Access-Token': token
    }
    const client = new GraphQLClient(requestUrl, { headers: requestHeaders })

    try {
      const locationQuery = gqlQuery.getLocation()
      const location = await client.request(locationQuery)
      resolve(location.location)
    }
    catch(e) {
      reject(e)
    }
  })
}

export { updateFulfilledBy, getLocation }