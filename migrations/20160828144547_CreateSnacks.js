exports.up = (knex, Promise) => {
  return knex.schema.createTable('snacks', (t) => {
    t.increments();
    t.string('name');
    t.boolean('healthy');
    t.integer('quantity');
    t.float('ounces');
    t.timestamps();
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('snacks');
};
