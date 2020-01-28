import dotenv from 'dotenv'

import development from './dev'
import production from './prod'

dotenv.config()

const uri = (() => process.env.NODE_ENV === 'production' ? production.appUri : development.appUri)()
const port = process.env.PORT || 3000
const key = process.env.SHOPIFY_API_KEY
const secret = process.env.SHOPIFY_API_SECRET
const scopes = process.env.SHOPIFY_API_SCOPES
const env = process.env.NODE_ENV

export { port, uri, key, secret, scopes, env }