# README

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
