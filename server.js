const express = require('express'),
  app = express(),
  path = require('path'),
  logger = require('morgan'),
  config = require('./config/main'),
  { getDirectories, seo, errorHandler, basicAuth } = require('./utils');

// Generate robots.txt disallow protected routes
seo.genRobots('protected', 'robots.txt');
seo.genRobots('routes', 'sitemap.xml');

// logger init
app.use(logger('dev'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Protected folder
for (directory of getDirectories('protected')) {
  app.use(`/${directory.name}`, [
    basicAuth,
    express.static(path.join(__dirname, `protected/${directory.name}`))
  ]);
}

// Routes folder
for (directory of getDirectories('routes')) {
  app.use(
    `/${directory.name}`,
    express.static(path.join(__dirname, `routes/${directory.name}`))
  );
}

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', {
    routes: [...Object.values(getDirectories('routes').values)]
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(errorHandler);

module.exports = app;
