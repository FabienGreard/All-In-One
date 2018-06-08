const marked = require('marked'),
  fs = require('fs');

module.exports = markdown = (...args) => {
  const [req, res, next, dir = ''] = args;
  fs.readFile(dir + '/' + req.url + '/index.md', 'utf8', (err, data) => {
    if (err) next(err);
    res.send(marked(data));
  });
};
