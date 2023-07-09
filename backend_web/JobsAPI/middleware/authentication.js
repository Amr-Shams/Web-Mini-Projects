const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index');
const { user } = require('pg/lib/defaults');

const auth = async(req,res)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token=auth.split(' ')[1];
    try{
        user=jwt.verify(token,process.env.JWT_SECRET);
        req.user=user;
        next();
    }catch(error){
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports=auth;