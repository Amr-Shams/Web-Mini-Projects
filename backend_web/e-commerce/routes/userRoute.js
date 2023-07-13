const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    showCurrentUser,
    getSingleUser,
    updateUser,
    updateUserPassword,
} = require('../controllers/UserController');
const {
    isAuthenicated,
    isAuthrized,
} = require('../middleware/authentication');


router.route('/').get(isAuthenicated, isAuthrized('admin'), getAllUsers);
router.route('/me').get(showCurrentUser);
router.route('/:id').get(isAuthenicated, isAuthrized('admin'), getSingleUser); 
router.route('/update').patch(isAuthenicated, isAuthrized('admin'), updateUser);
router.route('/updatePassword').patch(isAuthenicated, isAuthrized('admin'), updateUserPassword);

module.exports = router;