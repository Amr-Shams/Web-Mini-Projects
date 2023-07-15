// a user controller

const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError,unauthorized } = require('../errors');
const asyncHandler = require('express-async-handler');
const {
    createTokenUser,
    attachCookiesToResponse,
    isTokenValid,
    createJWT,
} = require('../utils/index');
// show all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send("Fuck you")
    res.status(StatusCodes.OK).json({ users });
});
// show a single user

const showCurrentUser = asyncHandler(async (req, res) => {
    res.status(StatusCodes.OK).json({ user:req.user });
});

// get a single user

const getSingleUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new BadRequestError('No user found with this id');
    }
    checkPermission(req.user,user);
    res.status(StatusCodes.OK).json({ user });
});

// update a user

const updateUser = asyncHandler(async (req, res) => {
    const {email,name} = req.body;
    if(!email || !name){
        throw new BadRequestError('Please provide email and name');
    }
    const user = User.findOneAndUpdate({_id:req.user.userId},req.body,{new:true,runValidators:true});
    if(!user){
        throw new UnauthenticatedError('No user found with this id');
    }
    // create a token and attach it to the cookies
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res,tokenUser);
    res.status(StatusCodes.OK).json({ user });
});



// update user password

const updateUserPassword = asyncHandler(async (req, res) => {
    const {email,name,oldPassword,newPassword} = req.body;
    if(!email || !name || !oldPassword || !newPassword){
        throw new BadRequestError('Please provide email and name');
    }
    const hashedPassword = createJWT(newPassword);
   const user = User.findOneAndUpdate({_id:req.user.userId},{password:hashedPassword},{new:true,runValidators:true});
    if(!user){
        throw new UnauthenticatedError('No user found with this id');
    }
    // create a token and attach it to the cookie
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res,tokenUser);
    res.status(StatusCodes.OK).json({ user });
});

// delete a user

const deleteUser = asyncHandler(async (req, res) => {
    const {email,name,password} = req.body;
    if(!email || !name || !password){
     throw new BadRequestError('Please provide email and name');
    }
    const user = User.findOneAndDelete({_id:req.user.userId});
    if(!user){
        throw new UnauthenticatedError('No user found with this id');
    }
    // find the token and delete it
    let token = req.cookies.token;
    if(token){
        res.cookie('token','',{expires:new Date(Date.now()),httpOnly:true});
    }
    res.status(StatusCodes.OK).json({ user });
});

module.exports = { getAllUsers,showCurrentUser, getSingleUser, updateUser, updateUserPassword, deleteUser };