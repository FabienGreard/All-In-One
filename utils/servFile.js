const express = require('express'),
  path = require('path'),
  markdown = require('./markdown'),
  basicAuth = require('./basicAuth'),
  checkFileExt = require('./checkFileExt');

module.exports = servFile = (app, directories, options = {}) => {
  const { exts = null, isProtected = false, baseDir = '' } = options;
  const _baseDir = baseDir !== '' ? `/${baseDir}/` : '/';
  for (const directory of directories) {
    if (!exts) {
      // if there is no extension files to check serve the whole directory
      app.use(express.static(path.join(__dirname, `${_baseDir}${directory}`)));
    } else {
      for (const ext of exts) {
        //check if file extension matched
        const isExt = checkFileExt(
          path.join(__dirname, `${_baseDir}${directory.name}/index.${ext}`)
        );

        if (isExt) {
          if (ext === 'html') {
            if (isProtected) {
              //protected directory
              app.use(`${directory.url}`, [
                basicAuth,
                express.static(
                  path.join(__dirname, `${_baseDir}${directory.name}`)
                )
              ]);
            } else {
              //public directory
              app.use(
                `${directory.url}`,
                express.static(
                  path.join(__dirname, `${_baseDir}${directory.name}`)
                )
              );
            }
          } else {
            //Check if it is a markdown or pug file
            app.get(`${directory.url}`, (req, res, next) => {
              ext === 'md'
                ? markdown(req, res, next, path.join(__dirname, `${_baseDir}`))
                : res.render(`${directory.name}/index`);
            });
          }
        }
      }
    }
  }
};
