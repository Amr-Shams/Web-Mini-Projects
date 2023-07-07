// create the auth middleware for token verification
const jwt = require('jsonwebtoken');
const {unAuthorized} = require('../errors');

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new unAuthorized('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,'secret');
        const {id,username} = decoded;
        req.user = {id,username};
        next();
    } catch (error) {
        throw new unAuthorized('Not authorized to access this route');
    }
}
module.exports = auth;