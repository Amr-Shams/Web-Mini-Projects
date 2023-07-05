// create a schema for the product
// the product has a name, price,company name and featured, rating and createdAt

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"],
    },
    price: {
        type: Number,
        required:[true, "Product price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    companyName:{
        type:String,
        enum:{
            values:["ikea","liddy","caressa","marcos"],
            message:"{VALUE} is not supported",
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Product", productSchema);
