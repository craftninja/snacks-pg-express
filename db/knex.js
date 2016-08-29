var knex = require('knex');

var DATABASE_URL = process.env.DATABASE_URL;

if (DATABASE_URL === undefined) {
	console.warn("No DATABASE_URL found in environment");
}

var DB_DEFAULTS = {
    client: 'pg',
    connection: DATABASE_URL,
    pool: {
      min: 0,
      max: 7
    }
}

function getDB(config) {
  /*
   *  Returns a knex object connected to the database specified by config.  If
   *  config is not specified then use defaults pulled from environment.
   */
  if (config === undefined) {
    config = {};
  }

  var db_config = Object.assign({}, DB_DEFAULTS, config);
  console.log("Initializing DB connection: ", JSON.stringify(db_config));
  if (db_config.connection === undefined) {
    // TODO: blow up because we need connection information.
  }
  return knex(db_config);
}

module.exports = {
  getDB: getDB
}
