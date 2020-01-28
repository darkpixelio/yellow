import { key, secret } from '../config'
import request from 'request-promise'

const getAccessToken = (shop, code) => {
  return new Promise(async (resolve, reject) => {
    if(!shop && !code) reject({ message: 'shop and code required' })

    const requestUrl = `https://${shop}/admin/oauth/access_token`
    const requestPayload = {
      client_id: key,
      client_secret: secret,
      code,
    }

    try{
      const tokenResponse = await request.post(requestUrl, { json: requestPayload })
      const token = tokenResponse.access_token
      resolve(token)
    }
    catch(e) {
      reject({message: e})
    }
  })
}

export { getAccessToken }