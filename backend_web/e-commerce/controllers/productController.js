// controller for product
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const path = require('path');

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
});

// get single product

const getSingleProduct = asyncHandler(async (req, res) => {
    // take the SKU from the params
    const { id: productSKU } = req.params;
    const product = await Product.findOne({ SKU: productSKU });
    if (!product) {
        throw new BadRequestError('No product found with this SKU');
    }
    res.status(StatusCodes.OK).json({ product });
});


// create a product
const createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user.userId; // why? 
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
});

// update a product

const updateProduct = asyncHandler(async (req, res) => {
    const { id: productSKU } = req.params;
    const product = Product.findOneAndUpdate({ SKU: productSKU }, req.body, { new: true, runValidators: true });
    if (!product) {
        throw new BadRequestError('No product found with this SKU');
    }
    res.status(StatusCodes.OK).json({ product });
});

// delete a product

const deleteProduct = asyncHandler(async (req, res) => {
    const { id: productSKU } = req.params;
    const product = await Product.findOneAndDelete({ SKU: productSKU });
    if (!product) {
        throw new BadRequestError('No product found with this SKU');
    }
    res.status(StatusCodes.OK).json({ msg: 'Product deleted successfully' });
});

// upload image

const uploadImage = asyncHandler(async (req, res) => {
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    // check the type of the image by the extension is one of the following
    // jpg, jpeg, png
    if (productImage.extension !== 'jpg' && productImage.extension !== 'jpeg' && productImage.extension !== 'png') {
        throw new BadRequestError('Please upload an image');
    }
    if (productImage.size > process.env.MAX_FILE_UPLOAD) {
        throw new BadRequestError(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`);
    }
    // create custom file name
    productImage.name = `${Date.now()}_${path.parse(productImage.name).ext}`;
    productImage.mv(`${process.env.FILE_UPLOAD_PATH}/${productImage.name}`, async (err) => {
        if (err) {
            throw new BadRequestError('Problem with file upload');
        }
        res.status(StatusCodes.OK).json({ msg: 'File Uploaded', filePath: `/uploads/${productImage.name}` });
    });
});

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};

