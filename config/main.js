module.exports = {
  // credentials information
  username:
    process.env.NODE_ENV !== 'development'
      ? require('./.credential').username
      : 'admin',
  password:
    process.env.NODE_ENV !== 'development'
      ? require('./.credential').password
      : 'admin',
  //https keys and cert
  keys:
    process.env.NODE_ENV !== 'development'
      ? require('./.credential').keys
      : 'admin',
  cert:
    process.env.NODE_ENV !== 'development'
      ? require('./.credential').cert
      : 'admin',
  host:
    process.env.NODE_ENV !== 'development'
      ? require('./.credential').host
      : 'localhost',
  //you may want to disable https
  protocole: process.env.NODE_ENV !== 'development' ? 'https' : 'http',
  // Setting port for server
  port: process.env.NODE_ENV !== 'development' ? 80 : 8080
};
