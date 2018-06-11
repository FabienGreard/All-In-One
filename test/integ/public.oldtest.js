const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  app = require('../../server.js');

describe('Public', () => {
  test('Should render public urls', done => {
    const directories = getDirectories('public');
    for (const directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .expect(200)
        .end(err => {
          if (err) throw done(err);
          done();
        });
    }
  });
});
