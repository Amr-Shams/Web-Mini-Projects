require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
});
const cors = require('cors');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const Authrouter = require('./routes/auth');
const Jobrouter = require('./routes/jobs');
const authenticateUser = require('./middleware/authentication');


app.use(limiter);
app.trustProxy = true;
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/v1/auth', Authrouter);
app.use('/api/v1/jobs', authenticateUser,Jobrouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGO_URI);
    console.log('db connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
