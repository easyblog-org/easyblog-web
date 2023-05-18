const { defineConfig } = require('@vue/cli-service')

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")

//环境变量，决定入口是客户端还是服务端
const TARGRT_NODE = process.env.WEBPACK_TARGET === "node"
const target = TARGRT_NODE ? "server" : "client"

module.exports = defineConfig({
  css: {
    extract: false
},
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,  // 关闭eslint
  outputDir: "./dist/" + target,
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
  configureWebpack: () => ({
    //将 entry 指向应用程序的 server entry 文件
    entry: `./src/entry-${target}.js`,
    //对 bundle renderer 提供 source map 支持
    devtool: "source-map",
    //这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)
    //并且还会在编译 Vue 组件时，告知 `vue-loader` 输送面向服务器代码(server-oriented code)
    target: TARGRT_NODE ? "node" : "web",
    node: TARGRT_NODE ? undefined : false,
    output: {
        //此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
        libraryTarget: TARGRT_NODE ? "commonjs2" : undefined
    },
    optimization: { splitChunks: TARGRT_NODE ? false : undefined },
    //将服务器的整个输出构建为单个 JOSN 文件的插件
    //服务端默认文件名为 vue-ssr-server-bundle.json
    plugins: [TARGRT_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
})
})
