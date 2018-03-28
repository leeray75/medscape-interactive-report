let webpackConfig = require('./webpack.config');
const devServer = {
  disableHostCheck: true,
  host: 'localhost.medscape.com',
  port: 8181,
  headers: { 'Access-Control-Allow-Origin': '*' },
	proxy: {
    '/qnaservice': {
        target: 'http://localhost.medscape.com:8080'
      },
	}
}

webpackConfig.devServer = devServer;
module.exports = webpackConfig;
