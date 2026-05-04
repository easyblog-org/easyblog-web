export default {
  target: 'static',
  ssr: true,

  head: {
    titleTemplate: '%s - EasyBlog',
    title: 'EasyBlog',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'referrer', content: 'no-referrer' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: process.env.UMAMI_SCRIPT_URL || '',
        async: true,
        defer: true,
        'data-website-id': process.env.UMAMI_WEBSITE_ID || '',
      },
      {
        hid: 'theme-init',
        innerHTML: "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()",
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'theme-init': ['innerHTML'],
    },
  },

  css: ['@/assets/css/main.css'],

  plugins: [{ src: '~/plugins/dateFormat.js' }, { src: '~/plugins/article-loader.js', mode: 'server' }],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  modules: ['@nuxtjs/axios', '@nuxtjs/sitemap', '@nuxtjs/feed', '@nuxt/content'],

  content: {
    dir: 'content',
  },

  axios: {},

  sitemap: {
    hostname: 'https://easyblog.top',
    gzip: true,
  },

  feed: [
    {
      path: '/feed.xml',
      type: 'rss2',
    },
  ],

  generate: {
    fallback: '404.html',
    async routes() {
      const fm = require('front-matter')
      const fs = require('fs')
      const path = require('path')
      const contentDir = path.resolve(__dirname, 'content/articles')
      const routes = []
      try {
        if (!fs.existsSync(contentDir)) return routes
        function walkDir(dir) {
          const results = []
          const list = fs.readdirSync(dir)
          for (const file of list) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)
            if (stat && stat.isDirectory()) {
              results.push(...walkDir(filePath))
            } else if (file.endsWith('.md')) {
              results.push(filePath)
            }
          }
          return results
        }
        const files = walkDir(contentDir)
        for (const filePath of files) {
          try {
            const raw = fs.readFileSync(filePath, 'utf-8')
            const parsed = fm(raw)
            const attrs = parsed.attributes || {}
            if (!attrs.draft) {
              routes.push('/article/' + (attrs.slug || path.basename(filePath, '.md')))
            }
          } catch (e) { }
        }
      } catch (e) { }
      return routes
    },
  },

  build: {
    vendor: ['axios'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
