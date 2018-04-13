const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const path = require('path');
const conf = require('./app/config/development');
global.env = process.env.NODE_ENV || 'development';

if (env === 'staging') {
  conf = require('./app/config/staging');
  config = require('./webpack.config.staging');
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: 'public/'
}).listen(8001, conf.DOMAIN, function(error) {
  if (error) {
    return console.log(error);
  }
  console.log('Server running at http://localhost:8001/');
});
