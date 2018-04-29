const path = require('path');

const srcFolderPath = path.join(__dirname, '..');
const clientFolderPath = path.join(srcFolderPath, 'client');

const config = {
  port: 3000,
  srcFolderPath,
  clientFolderPath,
};

module.exports = config;
