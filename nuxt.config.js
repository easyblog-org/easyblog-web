import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - EasyBlog',
    title: 'EasyBlog',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=0'},
      {hid: 'description', name: 'description', content: ''},
      //在此处添加
      {name: 'referrer', content: 'no-referrer'},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css',
    '@/assets/verifier.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/dateFormat.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-user-agent'
  ],

  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: process.env.production ? 'https://api.easyblog.top' : 'http://117.50.189.250:8001', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    },
    '/mxnzp-api': {
      target: 'https://www.mxnzp.com', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/mxnzp-api': '/',
      },
    },
    '/open-api': {
      target: 'http://apis.juhe.cn', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/open-api': '/',
      }
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },
  build: {
    vendor: ['axios'] //为防止重复打包
  },
}
