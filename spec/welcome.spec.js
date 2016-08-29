var request = require('request');
var app = require('../app.js');

var baseUrl = 'http://localhost:3000/'

describe('Snacks Root Path', () => {
  it('returns status code 200', (done) => {
    request.get(baseUrl, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('returns a greeting', (done) => {
    request.get(baseUrl, (error, response, body) => {
      expect(body).toBe('Welcome to the Snack Tracker!');
      done();
    });
  });

});
