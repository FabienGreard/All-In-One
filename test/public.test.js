const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  app = require('../server.js');

it('renders public url', done => {
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
