
// Auth and Token related imports
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { BadRequest} = require('../errors');
const auth = require('../middleware/auth');
const login = async (req, res) => {
    const{username,password}=req.body;
    if(!username || !password){
        throw new BadRequest("please provide email and password");
    }
    const id = new Date().getDate();
    const token = jwt.sign({id,username},'secret',{
        expiresIn:'30d',
    });
    res.status(StatusCodes.OK).json({msg:"user created",token});

};


const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({
        msg: `Hello ${req.user.username} your lucky number is ${luckyNumber}`,
    });

}
module.exports = {
    login,
    dashboard
}