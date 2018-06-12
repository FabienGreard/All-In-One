const basicAuth = require('../../utils/basicAuth');

describe('basicAuth', () => {
  let req, res, next;
  beforeEach(() => {
    //define new request, response
    req = {
      headers: {},
      baseUrl: 'http://localhost/'
    };

    res = {
      locals: {},
      set(key, value) {
        this.locals = { ...this.locals, [key]: value };
      }
    };

    next = jest.fn();
  });

  test('Should set a WWW-Authenticate', () => {
    basicAuth(req, res, next);

    expect(res.locals).toEqual({
      'WWW-Authenticate': 'Basic realm=http://localhost/'
    });
  });

  test('Should return an empty object', () => {
    req.headers = { authorization: 'Basic YWRtaW46YWRtaW4=' };
    basicAuth(req, res, next);

    expect(res.locals).toEqual({});
  });
});
