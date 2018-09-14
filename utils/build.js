const uglifyJS = require('uglify-js'),
  cleanCss = require('clean-css'),
  autoprefixer = require('autoprefixer'),
  fs = require('fs');

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      else resolve(path);
    });
  });
};

const js = async path => {
  const data = fs.readFileSync(path, 'utf-8');
  const { code } = uglifyJS.minify(data);
  await writeFile(path, code);
};

const css = async path => {
  const data = fs.readFileSync(path, 'utf-8');
  const { styles } = new cleanCss({ compatibility: '*' }).minify(browsers[0]);
  await writeFile(path, styles);
};

module.exports = {
  js,
  css
};
