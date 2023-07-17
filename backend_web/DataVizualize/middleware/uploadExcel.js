// Require the necessary packages and modules
const multer = require('multer');
const customAPIError = require('../errors/custom-api');
const { StatusCodes } = require('http-status-codes');
const path = require('path');


// Define the Multer middleware function to handle the file upload
function uploadExcel(req, res, next) {
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
      const filetypes = /xlsx|xls|csv/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new customAPIError('Only excel files are allowed!'));
    }
  }).single('file');
  upload(req, res, function(err) {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
    next();
  });
}

module.exports = uploadExcel;