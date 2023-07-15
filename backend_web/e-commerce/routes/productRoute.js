const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require('../controllers/productController');

const {
    isAuthenicated,
    isAuthrized,
} = require('../middleware/authentication');

router.route('/').get(getAllProducts).post(isAuthenicated, isAuthrized('admin'), createProduct);
router.route('/:id').get(getSingleProduct).patch(isAuthenicated, isAuthrized('admin'), updateProduct).delete(isAuthenicated, isAuthrized('admin'), deleteProduct);
router.route('/upload').post(isAuthenicated, isAuthrized('admin'), uploadImage);

module.exports = router;