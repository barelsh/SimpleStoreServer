var express = require('express');
var router = express.Router();

var store = null;

router.get('/resource', function(req, res, next) {
    res.send(store);
});

router.post('/resource', function(req, res, next) {
    store = {...req.body}
    res.end();
});

module.exports = router;
