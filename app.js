var express = require('express');
var logger = require('morgan');

var redisCacheConnector = require('./connectors/cache/redisCacheConnector');
var inMemoryCacheConnector = require('./connectors/cache/inMemoryCacheConnector');

var cacheConnector;
switch (process.env.CACHE_TYPE) {
    case 'REDIS':
        cacheConnector = new redisCacheConnector(process.env.CACHE_CONNECTION);
        break;
    case 'IN_MEMORY':
    default:
        cacheConnector = new inMemoryCacheConnector();
}

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store')(cacheConnector);


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', storeRouter);


module.exports = app;
