var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  knex('snacks').then((snacks) => {
  // TODO: check if db is undefined.
  db = req.app.get('db');

  db('snacks').then((snacks) => {
    res.json(snacks);
  });
});

router.post('/', (req, res, next) => {
  // TODO: check if db is undefined.
  db = req.app.get('db');

  var snack = {
    name: req.body.name,
    healthy: req.body.healthy === 'true',
    quantity: Number(req.body.quantity),
    ounces: Number(req.body.ounces),
    created_at: new Date(),
    updated_at: new Date(),
  }
  db('snacks').insert(snack).returning('*').then( (snacks) => {
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
