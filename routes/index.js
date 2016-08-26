var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome to the Snack Tracker!');
});

module.exports = router;
