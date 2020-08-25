var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Isso é um teste....@!!!');
});

module.exports = router;
