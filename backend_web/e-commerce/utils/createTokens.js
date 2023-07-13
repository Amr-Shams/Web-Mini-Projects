// function to create tokens

const { model } = require("mongoose");

const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, role: user.role };
}

module.exports = createTokenUser;