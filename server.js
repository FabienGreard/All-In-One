const app = require('express')(),
  path = require('path'),
  logger = require('morgan'),
  config = require('./config/main'),
  { getDirectories, seo, errorHandler, servFile } = require('./utils');

// Generate robots.txt disallow protected routes
seo.genRobots('protected', 'robots.txt');
seo.genRobots('routes', 'sitemap.xml');

// logger init
app.use(logger('dev'));

// View engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'routes'),
  path.join(__dirname, 'protected')
]);
app.set('view engine', 'pug');

// Private folder
servFile(app, getDirectories('protected'), {
  exts: ['md', 'html', 'pug'],
  isProtected: true,
  baseDir: '../protected'
});

// Routes folder
servFile(app, getDirectories('routes'), {
  exts: ['md', 'html', 'pug'],
  baseDir: '../routes'
});

// Public folder
servFile(app, ['public'], { baseDir: '../' });

app.get('/', (req, res, next) => {
  res.render('index', {
    routes: [
      ...Object.values(getDirectories('protected').values),
      ...Object.values(getDirectories('routes').values)
    ],
    googleAnalyticsId: config.googleAnalyticsId
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
