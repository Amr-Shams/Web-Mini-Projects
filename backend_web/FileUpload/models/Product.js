// a schema for the product model

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided'],
        min: 0,
        max: 100000,
    },
    image: {
        type: String,
        required: [true, 'product image must be provided'],
    },
}
);
module.exports = mongoose.model('Product', ProductSchema);

