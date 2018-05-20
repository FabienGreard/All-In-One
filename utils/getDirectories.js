const fs = require('fs'),
  path = require('path');

const isDirectory = source => fs.lstatSync(source).isDirectory();
module.exports = getDirectories = source => {
  const directories = fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

  return {
    [Symbol.iterator]: function() {
      let i = 0;
      const size = Object.keys(this.values).length;
      const values = this.values;
      return {
        next: function() {
          if (i < size) {
            i++;
            return {
              value: values[i - 1],
              done: false
            };
          }
          return { done: true };
        }
      };
    },
    values: {
      ...directories.map(name => {
        return {
          name: name.slice(source.length + 1),
          url: name.slice(source.length)
        };
      })
    }
  };
};
