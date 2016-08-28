var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('snacks').then((snacks) => {
    res.json(snacks);
  });
});

router.post('/', (req, res, next) => {
  var snack = {
    name: req.body.name,
    healthy: req.body.healthy === 'true',
    quantity: Number(req.body.quantity),
    ounces: Number(req.body.ounces),
    created_at: new Date(),
    updated_at: new Date(),
  }
  knex('snacks').insert(snack).returning('*').then( (snacks) => {
    res.json(snacks[0]);
  })
});

module.exports = router;
