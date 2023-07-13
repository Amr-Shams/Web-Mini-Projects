// register / login / logout a user
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError,unauthorized } = require('../errors');
const asyncHandler = require('express-async-handler');
const {
    createTokens,createJWT,attachCookiesToResponse,isTokenValid,checkPermission,
} = require('../utils/index');

// register a user
const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const cnt = await User.countDocuments({});
    if (cnt === 0) {
        req.body.role = 'admin';
    }
    const user = await User.create(req.body);
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res,tokenUser);
    res.status(StatusCodes.CREATED).json({ user });
});

// login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if email and password are provided
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    // check if user exists in db
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    // check if password matches
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    // create a token and attach it to the cookies
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res,tokenUser);
    res.status(StatusCodes.OK).json({ msg: 'success', user });
});

// logout a user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', 'logout', {
        expires: new Date(Date.now() +1000),
        httpOnly: true,
    });
    res.status(StatusCodes.OK).json({ msg: 'success' });
});

module.exports = { registerUser, loginUser, logoutUser };