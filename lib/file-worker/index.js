const fs = require('fs');

const readFile = (path, action) => {
  fs.readFile(path, 'utf8', (err, contents) => {
    if(err) {
      throw err;
    }
    action(contents);
  });
}

const writeFile = (path, data, action) => {
  fs.writeFile(path, data, err => {
    if(err) {
      throw err;
    }
    action();
  });
}

module.exports = {
  readFile,
  writeFile
}