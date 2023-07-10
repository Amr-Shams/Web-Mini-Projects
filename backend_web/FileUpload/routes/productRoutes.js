const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
} = require('../controllers/productController');
const {uploadProductImage,uploadProductImageLocal} = require('../controllers/uploadsController');
router.route('/').get(getAllProducts).post(createProduct);
router.route('/upload/local').post(uploadProductImageLocal);
router.route('/uploads').post(uploadProductImage);

module.exports = router;