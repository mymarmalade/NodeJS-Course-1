import express from 'express'
import router from './routes'
import errorHandler from './middleware/error-handler'
import renderTemplate from './middleware/render-template'

global.__basedir = __dirname

const app = express()

app.use(express.static('public'))

app.use(renderTemplate)

const port = 8000

app.use(router)

app.use(errorHandler)

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`)
})