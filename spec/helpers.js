var app = require('../app.js');
var db = require('../db/knex');
var knex = require('knex');

var TEST_DB_CONFIG = {
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
};

function setupWebserver(done) {
  console.log('starting webserver...');
  this.server = app.listen(function() {
    console.log('webserver started');

    console.log('opening DB connection...');
    db_connection = db.getDB(TEST_DB_CONFIG);

    console.log('running DB migrations...');
    db_connection.migrate.latest().then(function() {
      console.log('DB migrations finished.');

      done();  // Signal app is ready for tests to run.
    });
    app.set('db', db_connection);
  });

  // setup a listener to close the db connection.
  this.server.on('close', function() {
    console.log('closing DB connection...');
    db_connection.destroy();
  });

  // setup the URL that should be used for app requests
  this.baseUrl = "http://localhost:" + this.server.address().port + "/";
}

function teardownWebserver(done) {
  console.log('shutting down webserver...');
  this.server.close(function() {
    done();
  });
}

module.exports = {
  setupWebserver: setupWebserver,
  teardownWebserver: teardownWebserver
}
