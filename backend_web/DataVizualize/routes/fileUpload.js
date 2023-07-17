const express = require('express');
const uploadExcel = require('../middleware/uploadExcel');
const handleUpload = require('../controllers/uploadExcel');

// Set up the router
const router = express.Router();

// Define a route for handling Excel file uploads
router.post('/', uploadExcel, handleUpload);

// Export the router
module.exports = router;