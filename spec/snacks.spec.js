var request = require('request');
var helpers = require('./helpers');

describe('Snacks', function() {
  beforeEach(helpers.setupWebserver);

  afterEach(helpers.teardownWebserver);

  it('returns status code 200', function(done) {
    request.get(this.baseUrl + 'snacks', function(error, response, body) {
      expect(response).toNotBe(undefined);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  
  it('returns empty list of snacks', function(done) {
    request.get(this.baseUrl + 'snacks', function(error, response, body) {
      expect(body).toBe(JSON.stringify([]));
      done();
    });
  });
});
