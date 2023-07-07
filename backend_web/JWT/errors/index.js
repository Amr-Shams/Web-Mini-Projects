const CustomAPIError = require('./custom-error');
const unAuthorized = require('./unathu');
const BadRequest = require('./bad-request');

module.exports = {
    CustomAPIError,
    unAuthorized,
    BadRequest
}