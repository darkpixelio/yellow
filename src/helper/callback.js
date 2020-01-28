import querystring from 'querystring'
import crypto from 'crypto'

import { secret } from '../config'

const verifyHmac = (req, hmac) => {
  return new Promise((resolve, reject) => {
    const map = Object.assign({}, req.query)

    delete map['signature']
    delete map['hmac']

    const message = querystring.stringify(map)
    const providedHmac = Buffer.from(hmac, 'utf-8')
    const generatedHash = Buffer.from(
      crypto
      .createHmac('sha256', secret)
      .update(message)
      .digest('hex'),
      'utf-8'
    )

    let valid = false

    try {
      valid = crypto.timingSafeEqual(generatedHash, providedHmac)
      resolve(valid)
    }
    catch(e) {
      valid = false
      reject(e)
    }
  })
}

export { verifyHmac }