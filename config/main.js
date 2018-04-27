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
  // Setting port for server
  port: process.env.NODE_ENV !== 'development' ? 80 : 8080
};
