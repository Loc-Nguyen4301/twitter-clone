// dotenv
require('dotenv').config();

//connectDB
const { connectDb } = require('./configs/db');
connectDb();
//
const express = require('express');
const cors = require('cors');
const app = express();

// Import Routes
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
//Import ErrorHandler
const { errorHandler } = require('./middlewares/errorHandler');

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

//Mount the route ( ket noi route voi server)
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);

//Unhandler Route
app.all('*', (req, res, next) => {
    const err = new Error("The Route can't be found");
    err.statusCode = 404;
    next(err);
    // chuyen xuong errorHandle de xy ly
});
app.use(errorHandler);

//
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
