const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  app = require('../server.js');

describe('integration', () => {
  test('renders index', done => {
    request(app)
      .get(`/`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
  test('404', done => {
    request(app)
      .get(`/not-found`)
      .expect(404)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
});
