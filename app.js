const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');



const usersRouter = require('./api/routes/users');
const eventsRouter = require('./api/routes/events')

mongoose.connect(
    'mongodb+srv://db_user:' +
        process.env.MONGO_ATLAS_PW +
        '@cluster0.r13tt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

// Routes which should handle requests
app.use('/users',usersRouter);
app.use('/events',eventsRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;