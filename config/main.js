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
  // Setting port for server
  port: process.env.NODE_ENV !== 'development' ? 80 : 8080
};
