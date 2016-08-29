var request = require('request');
var helpers = require('./helpers');

describe('Snacks Root Path', () => {
  beforeEach(helpers.setupWebserver);

  afterEach(helpers.teardownWebserver);

  it('returns status code 200', (done) => {
    request.get(this.baseUrl, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('returns a greeting', (done) => {
    request.get(this.baseUrl, function(error, response, body) => {
      expect(body).toBe('Welcome to the Snack Tracker!');
      done();
    });
  });

});
