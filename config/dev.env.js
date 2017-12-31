var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.1.104:8360/fastfood/api"',
  ASSET_ROOT: '"/"'
})
