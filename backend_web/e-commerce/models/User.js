const { default: mongoose } = require("mongoose")
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            'Please provide a valid email',
        ],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);