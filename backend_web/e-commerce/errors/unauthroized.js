const CustomAPIError = require('./custom-api');
const {StatusCodes} = require('http-status-codes');
// create a class that extends the Error class
class unauthorized extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = unauthorized;