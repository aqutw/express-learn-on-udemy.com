var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json(/* {type:'application/*+json'} // Parse various different JONS type */));
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded ( see also: multer express-busboy connect-busboy node-multiparty )
//app.use(bodyParser.raw({type:'application/vnd.custom-type'})) // Parse some custom thing into a Buffer

app.use(cookieParser());
// app.use(express.session({secret: 'asdkfjalkfdjsalj'})) ---> req.session
app.use(express.static(path.join(__dirname, 'public')));

/*
Load Balancing: Clusters Nginx HAProxy Varnish
*/

app.use('/', routes);
app.use('/users', users);

/*
app[get|post|put|delete|all|use](urlPattern, reqHandler1, reqHandler2, ...)
app.param('name', callback(req, res, next, param_value//<--'name'  ))
Example:
app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
});
app.get('/collection/:collectionName', function(req, res, next){
  req.collection.find({}, {limit:10, sort:{'_id':-1}}).toArray(function(err, results){
    if (err) return next(err)
    res.send(results)
  })
})
*/

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
