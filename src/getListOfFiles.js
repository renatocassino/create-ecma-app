/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

const getListOfFiles = (dir, filelist = [], sourceRoot = dir) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? getListOfFiles(path.join(dir, file), filelist, sourceRoot)
      : filelist.concat(path.join(dir, file).replace(`${sourceRoot}/`, ''));
  });
  return filelist;
};

module.exports = getListOfFiles;
