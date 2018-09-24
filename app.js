var express = require('express');
var logger = require('morgan');

var cacheConnector = require('./connectors/cache/inMemoryCacheConnector');

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store')(new cacheConnector());


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', storeRouter);


module.exports = app;
