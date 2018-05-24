const express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  app = express(),
  config = require('./config/main'),
  getDirectories = require('./utils/getDirectories'),
  basicAuth = require('./utils/basicAuth');

// logger init
app.use(logger('dev'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// protected folder
for (directory of getDirectories('protected')) {
  console.log();
  app.use(`/${directory.name}`, [
    basicAuth,
    express.static(path.join(__dirname, `protected/${directory.name}`))
  ]);
}

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', {
    essays: [...Object.values(getDirectories('public/essays').values)],
    apps: [...Object.values(getDirectories('public/apps').values)]
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' && err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
