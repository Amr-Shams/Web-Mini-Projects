// controller to send emails 
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const asyncHandler = require('express-async-handler');
const sendEmailEthereal = asyncHandler(async (req, res) => {
    const { subject, email, text } = req.body;
    if (!subject || !email || !text) {
        throw new BadRequestError('Please provide all values');
    }
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });
    const message = {
        from: 'Sender Name <'.concat(email, '>'),
        to: `Recipient <${process.env.TO_EMAIL}>`,
        subject: subject,
        text: text,
    };
    const info = await transporter.sendMail(message);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
const sendEmail = asyncHandler(async (req, res) => {
    const { subject, email, text } = req.body;
    if (!subject || !email || !text) {
        throw new BadRequestError('Please provide all values');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: subject,
        text: text,
    };
    await sgMail.send(msg);
    res.status(StatusCodes.OK).json({ msg: 'Email sent' });
});
module.exports = {
    sendEmailEthereal,
    sendEmail,
};
