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
