const getDirectories = require('../utils/getDirectories'),
  request = require('supertest'),
  app = require('../../server.js');

describe('Routes', () => {
  test('Should render routes urls', done => {
    const directories = getDirectories('routes');
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
  test('Should not match', () => {
    const directories = getDirectories('this-should-never-match')[
      Symbol.iterator
    ]();
    expect(directories.next()).toEqual({ done: true });
  });
});
