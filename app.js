var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var routes = require('./routes/router');

var app = express();

var COOKIE_SECRET = "DiS000meS33cre333tSh"
var COOKIE_NAME = "TABSAVER_DASHBOARD"

// view engine setup
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Setup the session stuff
app.use(cookieSession({
  name: COOKIE_NAME,
  secret: COOKIE_SECRET,
  maxAge: 15724800000
}));

app.use(cookieParser(COOKIE_SECRET));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('errors/404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// error handlers

// development error handler
// will print stacktrace
//TODO:

// production error handler
// no stacktraces leaked to user
//TODO:



module.exports = app;
