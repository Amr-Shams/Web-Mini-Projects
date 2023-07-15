// order controller
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


// Fake Payment
const fakePayment = asyncHandler(async (amount, currency) => {
    const client_secret = Math.random().toString(36).substring(2);
    return { client_secret ,amount};
});
// get single order

const getSingleOrder = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findById(orderId).populate('products.product');
    if (!order) {
        throw new BadRequestError('No order found with this id');
    }
    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({ order });
});

// get all orders

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('products.product');
    res.status(StatusCodes.OK).json({ orders });
});

// update order status

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;
    const { status, paymentIntentId } = req.body;
    // check if the order exists
    const order = Order.findById(orderId);
    if (!order) {
        throw new BadRequestError('No order found with this id');
    }
    // check if the order status is pending
    if (order.status !== 'pending') {
        throw new BadRequestError('Order status is not pending');
    }
    // now check the permissions
    checkPermissions(req.user, order.user);
    // update the order status
    order.status = 'Paid';
    order.paymentIntentId = paymentIntentId;
    await order.save();
    res.status(StatusCodes.OK).json({ order });
});

// create a new order

const createOrder = asyncHandler(async (req, res) => {
    const { items: cartItems, tax, shippingFee} = req.body;
    if(cartItems.length < 1 || !cartItems){
        throw new BadRequestError('No items in the cart');
    }
    if(!tax || !shippingFee){
        throw new BadRequestError('Please provide tax and shipping fee');
    }
    // for each item in the cart we need to check if the product exists
    // and if the inventory is enough
    const orderItems = [];
    for (let i = 0; i < cartItems.length; i++) {
    const { product: productId, amount } = cartItems[i];
    const product = Product.findOne({ _id: productId });
    if (!product) {
        throw new BadRequestError('No product found with this id');
    }
    if (product.inventory < amount) {
        throw new BadRequestError('Not enough inventory');
    }
    // if everything is ok we can push the item to the orderItems array
    orderItems.push({
        name: product.name,
        image: product.images[0],
        price: product.price,
        amount,
        product: productId,
    });
    }
    // update the inventory
    for (let i = 0; i < orderItems.length; i++) {
    const { product: productId, amount } = orderItems[i];
    // find the product
    const product = Product.findOne({ _id: productId });
    // update the inventory
    product.inventory = product.inventory - amount;
    // save the product
    await product.save();
    }
    const total = orderItems.reduce((acc, item) => {
        return acc + item.price * item.amount;
    }, 0);
    const paymentIntent = await fakePayment(total, 'usd');
    const order = await Order.create({
        tax,
        shippingFee,
        subtotal: total,
        total: total + tax + shippingFee,
        orderItems,
        user: req.user.userId,
        client_secret: paymentIntent.client_secret,
    });
    res.status(StatusCodes.CREATED).json({ order }); 
});

module.exports = {
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
    createOrder,
};



