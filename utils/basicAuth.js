const getDirectories = require('./getDirectories'),
  config = require('../config/main');

module.exports = basicAuth = (req, res, next) => {
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  let [login, password] = new Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (
    !login ||
    !password ||
    login !== config.username ||
    password !== config.password
  ) {
    res.set('WWW-Authenticate', `Basic realm=${req.baseUrl}`);
    res.status(401).render('index', {
      title: 'HS - Huge Server',
      links: [
        ...Object.values(getDirectories('public').values),
        ...Object.values(getDirectories('protected').values)
      ],
      status: 'Unauthorized !'
    });
    return;
  }

  next();
};
