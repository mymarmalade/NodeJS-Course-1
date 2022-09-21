import { JsonSchemaValidation } from 'express-jsonschema'
import log from '../utils/logger'

export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  if (err instanceof JsonSchemaValidation) {
    return res.status(400).json({
      code: 400,
      message: 'Validation error',
      fields: err.validations
    })
  }

  const status = err.status || 500
  const message =
    status < 500 || process.env.NODE_ENV === 'development'
      ? err.message
      : 'Server error, please call admin'

  log({
    level: 'error',
    message: err.message,
    metadata: { user: req.user, url: req.url, status, stack: err.stack }
  })

  if (req.url.startsWith('/api')) {
    res.status(status).json({
      code: status,
      message
    })
  } else {
    res.status(status).render('error', {
      title: `Error ${status}`,
      message
    })
  }
}
