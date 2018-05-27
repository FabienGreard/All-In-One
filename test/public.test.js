const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  app = require('../server.js');

describe('Public', () => {
  test('Should render public urls', done => {
    const directories = getDirectories('public');
    for (directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .expect(301)
        .end(err => {
          if (err) throw done(err);
          done();
        });
    }
  });
});
