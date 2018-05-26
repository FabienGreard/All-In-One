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
      essays: [...Object.values(getDirectories('public/essays').values)],
      apps: [...Object.values(getDirectories('public/apps').values)],
      status: 'Unauthorized !'
    });
    return;
  }

  next();
};
