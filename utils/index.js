const getDirectories = require('./getDirectories'),
  seo = require('./seo'),
  errorHandler = require('./errorHandler'),
  markdown = require('./markdown'),
  basicAuth = require('./basicAuth'),
  servFile = require('./servFile'),
  checkFileExt = require('./checkFileExt');

module.exports = {
  getDirectories,
  seo,
  errorHandler,
  basicAuth,
  markdown,
  checkFileExt,
  servFile
};
