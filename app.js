// require dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// require routes
var routes = require('./routes/index');


// declare and define app
var app = express();

// view engice setup
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// specifies the middleware for the app to use
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

// specifies routes app should use, index and users are defined above ^^
app.use('/', routes);

// specifies how to handle errors
//catch 404 and then call next() which is the err handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//developement error
if(app.get('env') === 'development') {
  // print stack trace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {message: err.message, error: err});
  });
};

//production error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {message: err.message, error: {}});
});


module.exports = app;
