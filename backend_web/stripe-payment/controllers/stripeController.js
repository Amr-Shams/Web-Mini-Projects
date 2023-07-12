// strip controller
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY );
const asyncHandler = require('express-async-handler');
const {Status_Code} = require('http-status-codes');

const stripeController = asyncHandler(async (req, res) => {
    const {purchase, total_amount,shipping_fee} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total_amount + shipping_fee,
        currency: 'usd',
        description: 'Software development services',
        shipping:{
            name: 'Amr Shams',
            address:{
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            }
        }
    });
    res.Status(Status_Code.OK).json({clientSecret: paymentIntent.client_secret});
});

module.exports = stripeController;