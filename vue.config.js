const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,  // 关闭eslint
  outputDir: './dist',
  assetsDir:'static',
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8090,
    allowedHosts: "all"
    // 存在跨域问题，需配置代理;
    // proxy: { 
    //   '/v2': {
    //       target: target,
    //       changeOrigin: true
    //   }
    // }
  },
})
