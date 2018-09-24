var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', storeRouter);


module.exports = app;
