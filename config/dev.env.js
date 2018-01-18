var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

var devLocation = process.env.DEV_LOCATION;
var apiHost = 'localhost';
if (devLocation === 'home') {
  apiHost = '192.168.1.104';
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: apiHost,
  API_ROOT: '"http://' + apiHost + ':8360/fastfood/api"',
  ASSET_ROOT: '"/"'
})
