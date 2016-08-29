# README

### TODO (snack crud)

1. ~~User can get a list of snacks~~
1. ~~User can add a snack~~
1. User can edit a snack
1. User can delete a snack

### Get this puppy up and running

1. Fork, clone, npm install
1. `$ npm start`
1. `$ createdb snacks_db`
1. `$ knex migrate:latest`
1. Welcome!
  * go to (http://localhost:3000/)[http://localhost:3000/] and be greeted
  * `$ curl http://localhost:3000/` and be greeted
1. See a list of snacks
  * go to (http://localhost:3000/snacks)[http://localhost:3000/snacks]
  * `$ curl http://localhost:3000/snacks`
1. Add a snack
  * `$ curl -X POST -d 'name=chocolate&healthy=true&quantity=5&ounces=3.5' http://localhost:3000/snacks`

### How was this thing made?

#### Basic Express App setup

1. `$ express snacks-pg`
1. `$ cd snacks-pg`
1. `$ touch README.md`, open in your favorite editor and start taking AMAZING NOTES.
1. `$ npm install`
1. `$ npm start` to start the server and check it out (http://localhost:3000/)[http://localhost:3000/]
1. install jasmine-node `$ npm install --save-dev jasmine-node`
1. Ensure you have jasmine-node globally installed `$ jasmine-node`
  * if not installed, `$ npm install -g jasmine-node`
1. Make a spec directory in the project root and `$ touch spec/test.spec.js`
1. add the following contents to `spec/test.spec.js`:

  ```js
  describe("test setup", () => {
    it("is setup", () => {
      expect(true).toBe(false);
    });
  });
  ```

1. Open `package.json` and add a new script called "test" with a value of "jasmine-node spec/" (follow pattern for "start" script)
1. Run the test `$ npm test`. Make sure the test fails, then change false to true and COMMIT. yay.
1. `$ git init`
1. `$ echo node_modules >> .gitignore`
1. `$ git add .`
1. Commit all changes

#### User is greeted by API at root

1. `$ mv spec/test.spec.js spec/welcome.spec.js`
1. Add the package request to dev dependencies `$ npm install --save-dev request`
1. Change the contents of the file to:

  ```js
  var request = require('request');
  var app = require('../app.js');

  var baseUrl = 'http://localhost:3000/'

  describe('Snacks Root Path', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns a greeting', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(body).toBe('Welcome to the Snack Tracker!');
        done();
      });
    });

  });
  ```

1. Run your tests. Change the `routes/index.js` response to:

  ```js
  res.send('Welcome to the Snack Tracker!');
  ```

  Remove the comment while you are there. Run your tests and make sure you have gone from red to green.
1. Strip out all server-side rendering cruft code, and re-run tests to make sure you are still green:
  * `app.js`:
    * remove `var favicon = require('serve-favicon');`... we won't need a favicon.
    * remove comment regarding favicon and commented code for favicon

      ```js
      // uncomment after placing your favicon in /public
      //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
      ```

    * remove view engine setup lines of code
      ```js
      // view engine setup
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'jade');
      ```
    * remove line of code to load static files `app.use(express.static(path.join(__dirname, 'public')));`
    * change the error case to render json as below (in two places):

      ```js
      res.json({
        message: err.message,
        error: err
      });
      ```
  * `package.json`:
    * remove jade and serve-favicon from dependencies. Make sure you address any trailing comma issues.
    * `$ rm -rf node_modules`, `$ npm install`, and restart server.
  * delete public directory
  * delete views directory
1. Commit new changes

#### Users can see a list of snacks

1. Change `users` to `snacks` in app.js (two lines of code, four places)
1. `$ mv routes/users.js routes/snacks.js` and change the content to:

  ```js
  var express = require('express');
  var router = express.Router();
  var knex = require('../db/knex')

  router.get('/', function(req, res, next) {
    knex('snacks').then((snacks) => {
      res.json(snacks);
    })
  });

  module.exports = router;
  ```

1. create a file `db/knex.js` with the following content:

  ```js
  var environment = process.env.NODE_ENV || 'development';
  var config = require('../knexfile.js')[environment];
  module.exports = require('knex')(config);
  ```

1. `$ knex init` and change the `knexfile.js` to have the following content:

  ```js
  module.exports = {
    development: {
      client: 'pg',
      connection: 'postgres://localhost/snacks_development'
    }
  };
  ```
1. `$ createdb snacks_development`
1. `$ knex migrate:make CreateSnacks` and change migration to the following content:

  ```js
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('snacks', (t) => {
      t.increments();
      t.string('name');
      t.boolean('healthy');
      t.integer('quantity');
      t.float('ounces');
      t.timestamps();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('snacks');
  };
  ```

1. `$ knex migrate:latest`
1. Check out your snacks
  * go to (http://localhost:3000/snacks)[http://localhost:3000/snacks]
  * `$ curl http://localhost:3000/snacks`
1. drop into the psql database and add a snack, and then check out your snacks again

  ```
  $ psql
  =# \c snacks_development
  =# INSERT INTO snacks(name, healthy, quantity, ounces)
  -# values('beef jerky', true, 15000, 3.2);
  ```

1. Commit all changes

#### User can add a snack

1. try curling a new snack
  * `$ curl -X POST -d 'name=chocolate&healthy=true&quantity=5&ounces=3.5' http://localhost:3000/snacks`
1. Add route for adding snacks

  ```js
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
  ```

1. try curling a new snack
  * `$ curl -X POST -d 'name=chocolate&healthy=true&quantity=5&ounces=3.5' http://localhost:3000/snacks`
1. Check out the list of snacks in the browser or via curl
1. Commit!

#### Deployment to Heroku

1. Create an app on Heroku and add the Heroku postgres add-on
1. Add the remote to your local repository
1. Add a development config to the knexfile
1. Change the start script from nodemon to node
1. Commit and push the app
1. Run migrations on Heroku
  * `$ heroku run knex migrate:latest`
1. Checkout the list of snacks on your deployed heroku app at '/snacks'
1. curl a new snack at your deployed heru app '/snacks' like so:
  * `$ curl -X POST -d 'name=chocolate&healthy=true&quantity=5&ounces=3.5' http://yourapp.herokuapp.com/snacks`
1. Checkout the added snack to your list of snacks on your deployed heroku app at '/snacks'

#### User can delete snacks

1. try curling to delete a snack
  * check your local list of snacks to find a snack to delete (you need the id)
  * `$ curl -X DELETE http://localhost:3000/snacks/4`
1. Add route for deleting snacks like so:

  ```js
  router.delete('/:id', (req, res, next) => {
    var snackToDelete = knex('snacks').where('id', req.params.id);
    snackToDelete.del().then( (deleted) => {
      res.json({deletedSnackID: req.params.id});
    });
  });
  ```

1. try curling to delete your snack, and then check your list of snacks.
1. Commit!
