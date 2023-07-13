const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authentcations');
const { isAuthenicated } = require('../middleware/authentication');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(isAuthenicated,logoutUser);

module.exports = router;