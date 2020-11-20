var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var registrationRouter = require('./routes/registration');
require('dotenv').config({path:'.env'});
var app = express();

// view engine setup

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/profile', indexRouter);
app.use('/register', indexRouter);
app.use('/dashboard', indexRouter);
app.use('/feedback', indexRouter);
app.use('/assignment', indexRouter);
app.use('/view_userfeedback', indexRouter);
app.use('/progress', indexRouter);
app.use('/bootcamp', indexRouter);
app.use('/schedule', indexRouter);
app.use('/courses', indexRouter);
app.use('/newProfile', indexRouter);
app.use('/forgotpassword', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
