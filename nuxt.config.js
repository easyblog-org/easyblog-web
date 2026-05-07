export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  runtimeConfig: {
    redisUrl: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN,
    enableRedisStats: process.env.ENABLE_REDIS_STATS === 'true',
    statsViewCooldown: parseInt(process.env.STATS_VIEW_COOLDOWN || '3600', 10),
    statsLikeExpire: parseInt(process.env.STATS_LIKE_EXPIRE || '3600', 10),
    enableRedisDebug: process.env.ENABLE_REDIS_DEBUG === 'true',
  },

  app: {
    head: {
      titleTemplate: '%s - EasyBlog',
      title: 'EasyBlog',
      htmlAttrs: { lang: 'zh' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=0' },
        { name: 'description', content: '' },
        { name: 'referrer', content: 'no-referrer' },
        { name: 'enable-redis-stats', content: process.env.ENABLE_REDIS_STATS === 'true' ? 'true' : 'false' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          innerHTML: "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()",
          tagPosition: 'bodyClose',
        },
      ],
    },
  },

  css: ['@/assets/css/main.css'],

  plugins: ['~/plugins/dateFormat', '~/plugins/article-loader'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: ['@pinia/nuxt'],

  nitro: {
    preset: 'vercel',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 2000,
      },
    },
  },
})
