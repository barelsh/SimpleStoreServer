var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end();
});

router.get('/isalive', function(req, res, next) {
    res.json({'msg': true});
});

module.exports = router;
