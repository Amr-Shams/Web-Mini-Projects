const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
    // Use a regular expression pattern to validate the name field
    match: /^[a-zA-Z0-9 ]+$/,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
return jwt.sign({ id: this._id,name: this.name}, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_LIFETIME,
});
}
UserSchema.methods.comparePasswords = async function (candidatePassword) {
return await bcrypt.compare(candidatePassword, this.password);
};
// export the model 
module.exports = mongoose.model('User', UserSchema);