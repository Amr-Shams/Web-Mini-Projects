// upload controller
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const uploadProductImageLocal = asyncHandler(async (req, res) => {
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    //check the extension
    const ext = path.extname(productImage.name);
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        throw new BadRequestError('Only images are allowed');
    }
    //check the size
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new BadRequestError('Please upload image smaller 1MB');
    }
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
});

const uploadProductImage = asyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload',
    });
    fs.unlinkSync(req.file.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
});

module.exports = {
    uploadProductImage,
    uploadProductImageLocal,
};