const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  // webpack-dev-server 相关配置
  devServer: {
    open: false,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    port: 8080,
    hot: true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    https: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 解决跨域问题
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === "production" ? "https://zeus.easyblog.top" : "http://localhost:8001", //目标接口域名
        secure: process.env.NODE_ENV === "production", //false为http访问，true为https访问
        ws: true,    //用于支持websocket
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '' //重写接口
        }
      }
    },
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false
})
