var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const expressWinston = require('winston-express-middleware');
const winston = require('winston');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const config = require('./config');

// const applicationsRoutes = require('./routes/index');
// const interviewsRoutes = require('./routes/interviews');
// const authRoutes = require('./routes/auth');
// const jobsRoutes = require('./routes/jobs');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/',function(req,res,next){
res.status(200).json({"status":"success"})
})

module.exports = app;
