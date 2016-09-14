var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var home = require('./routes/home');
var pg = require('./routes/pg');
var edit = require('./routes/edit');

var markdown = require( "markdown" ).markdown;

var test = require('./dwparser/parser');
console.log(test.jsonOutput());

var Datastore = require('nedb');
var db = new Datastore({ filename: path.join(__dirname, 'db/core.db'),
                        autoload: true });
  // db.insert({title: "test", content: "## markdown mise en forme \n # test"}, function (err, newDoc) {   // Callback is optional
  //   // newDoc is the newly inserted document, including its _id
  //   // newDoc has no key called notToBeSaved since its value was undefined
  //   console.log(newDoc);
  // });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res, next) {
  req.db = db;
  next();
})

app.use(function (req,res, next) {
  req.md = markdown;
  next();
})

app.use('/', home);
app.use('/pg', pg);
app.use('/edit', edit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
