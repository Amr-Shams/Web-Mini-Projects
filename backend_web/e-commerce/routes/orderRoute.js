const express = require('express');
const router = express.Router();
const {
    isAuthenicated,
    isAuthrized,
} = require('../middleware/authentication');

const {
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    createOrder,
    fakePayment,
} = require('../controllers/orderController');

router.route('/').get(isAuthenicated, isAuthrized('admin'), getAllOrders).post(isAuthenicated, createOrder);
router.route('/:id').get(isAuthenicated, getSingleOrder).patch(isAuthenicated, isAuthrized('admin'), updateOrderStatus);

module.exports = router;
