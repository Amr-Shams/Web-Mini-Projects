const User = require('../models/User');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const {StausCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const { use } = require('express/lib/router');

const register = async(req,res)=>{
   const user = await User.create({...req.body});
   const token = user.createJWT();
   res.json({token});
}
const login = async(req,res)=>{
    const {emailOrName,password} = req.body;
    if(!emailOrName || !password){
        throw new BadRequestError('Please provide email and password');
    }
    let user;
    if(emailOrName.includes('@')){
        user = await User.findOne({email:emailOrName});
    }else{
        user = await User.findOne({name:emailOrName});
    }
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    if(!user.comparePasswords(password)){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const token = user.createJWT();
    res.send("FUCK YOU")
}
module.exports = {
    register,
    login
}