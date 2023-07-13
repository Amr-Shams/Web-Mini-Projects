// an authenication middleware

const {isTokenValid} = require('../utils/index');
const User = require('../models/User');
const {UnauthenticatedError} = require('../errors');
const asyncHandler = require('express-async-handler');

const isAuthenicated = asyncHandler(async (req,res,next) => {
    let token;
    if(req.cookies.token){
        token = req.cookies.token;
    }
    if(!token){
        throw new UnauthenticatedError('Authentication invalid');
    }
    const decodedToken = isTokenValid(token);
    const user = await User.findById(decodedToken.userId);
    if(!user){
        throw new UnauthenticatedError('Authentication invalid');
    }
    req.user = user;
    next();
});
// function to check if the user has permission to perform the action based on the role

const isAuthrized = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role) && req.user.role !== 'admin'){
            throw new UnauthorizedError('You do not have permission to perform this action');
        }
        next();
    }
}


module.exports = {isAuthenicated,isAuthrized};