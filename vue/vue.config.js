const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/vue',
  indexPath:'index.ejs',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        ChangeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
  }
})
