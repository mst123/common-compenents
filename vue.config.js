const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => {
          return {
            limit: 40960,
            fallback: {
              loader: 'E:\\codeFile\\common-compenents\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        })
  }
}