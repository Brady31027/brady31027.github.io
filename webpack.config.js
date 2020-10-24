const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    }
}