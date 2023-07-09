const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || 'Something went wrong, please try again later',
  }
  if(err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  if(err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for : ${Object.keys(err.keyValue)}`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name === 'JsonWebTokenError') {
    customError.msg = 'Invalid token, please try again with a valid token'
    customError.statusCode = StatusCodes.UNAUTHORIZED
  }
  if(err.name === 'TokenExpiredError') {
    customError.msg = 'Token expired, please try again with a new token'
    customError.statusCode = StatusCodes.UNAUTHORIZED
  }
  if(err instanceof CustomAPIError) {
    customError.msg = err.message
    customError.statusCode = err.statusCode
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware