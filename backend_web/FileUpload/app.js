require('dotenv').config();
require('express-async-errors');
const fil_upload = require('express-fileupload');
// security
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
// product 
const productRouter = require('./routes/productRoutes');
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');
app.use(express.json());
app.use('/api/v1/products', productRouter);
app.use(express.static('./public'));
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})


// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));
app.use(fil_upload({useTempFiles:true}));


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
