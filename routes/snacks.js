var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  knex('snacks').then((snacks) => {
    res.json(snacks);
  })
});

module.exports = router;
