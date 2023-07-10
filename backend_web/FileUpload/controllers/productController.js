const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json(product);
}
);

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json(products);
}
);
module.exports = {
    getAllProducts,
    createProduct,
};