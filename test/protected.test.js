const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  config = require('../config/main'),
  app = require('../server.js');

describe('protected', () => {
  const directories = getDirectories('protected');
  it('renders protected url without credentials', done => {
    for (directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .expect(401)
        .end(err => {
          if (err) throw done(err);
          done();
        });
    }
  });
  it('renders protected url with credentials', done => {
    for (directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .set({
          Authorization:
            'Basic ' +
            new Buffer.from(config.username + ':' + config.password).toString(
              'base64'
            )
        })
        .expect(301)
        .end(err => {
          if (err) throw done(err);
          done();
        });
    }
  });
});
