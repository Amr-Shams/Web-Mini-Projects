const express = require('express');
const router = express.Router();
const { sendEmailEthereal, sendEmail } = require('../controllers/sendEmail');
router.route('/ethereal').post(sendEmailEthereal);
module.exports = router;