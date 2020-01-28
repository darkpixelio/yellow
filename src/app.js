import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'

const app = express()

app.use(cors({
  "origin": "*"
}))

app.use(express.static(path.join(__dirname, 'assets')))
app.use('/files', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

export default app