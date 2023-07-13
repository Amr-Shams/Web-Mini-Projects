// a function to attach cookies to the response
const jwt = require('jsonwebtoken');
const createJWT = (user) => {
    return jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
}
const isTokenValid = (token) => {return jwt.verify(token, process.env.JWT_SECRET)};
const attachCookiesToResponse = (res, tokenUser) => {
    const token = createJWT(tokenUser);
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie('token', token, options);
}

module.exports = { createJWT,attachCookiesToResponse,isTokenValid };