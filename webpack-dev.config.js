let webpackConfig = require('./webpack.config');
const devServer = {
  disableHostCheck: true,
  host: 'localhost.medscape.com',
  port: 8080,
  headers: { 'Access-Control-Allow-Origin': '*' },
	proxy: {
	  '/api': {
        target: 'https://www.medscape.com'
      },
      '/servicegateway': {
        target: 'https://api.qa02.medscape.com'
      },
      '/ws': {
        target: 'http://drugservice-app-qa00.prf.iad1.medscape.com:8080'
      }
	}
}

webpackConfig.devServer = devServer;
module.exports = webpackConfig;
