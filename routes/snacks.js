var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  var snackUpdate = {
    name: req.body.name,
    healthy: req.body.healthy ? req.body.healthy === 'true' : undefined,
    quantity: Number(req.body.quantity) || undefined,
    ounces: Number(req.body.ounces) || undefined,
    updated_at: new Date(),
  }
  knex('snacks').where('id', req.params.id).update(snackUpdate)
  .returning('*').then( (snacks) => {
    res.json(snacks[0]);
  })
});

router.delete('/:id', (req, res, next) => {
  var snackToDelete = knex('snacks').where('id', req.params.id);
  snackToDelete.del().then( (deleted) => {
    res.json({deletedSnackID: req.params.id});
  });
});

module.exports = router;
