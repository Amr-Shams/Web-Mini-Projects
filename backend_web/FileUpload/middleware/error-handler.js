const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  this.statusCode= err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  this.msg= err.message || 'Something went wrong try again later'
  if (err.name === 'ValidationError') {
    this.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    this.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    this.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    this.statusCode = 400
  }
  if (err.name === 'CastError') {
    this.msg = `No item found with id : ${err.value}`
    this.statusCode = 404
  }

  return res.status(this.statusCode).json({ msg: this.msg })
}

module.exports = errorHandlerMiddleware
