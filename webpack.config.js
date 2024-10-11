const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'), // Ścieżka do folderu, w którym znajduje się index.html
    compress: true,
    port: 9000, // Możesz ustawić dowolny port
  },
};