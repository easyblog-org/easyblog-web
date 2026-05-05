<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="lg:w-1/3 space-y-4">
        <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 0ms">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span>
              <svg t="1777919701989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4986" width="20" height="20"><path d="M356.550194 280.27871c0-20.48 16.615226-37.128258 37.095225-37.128258h411.581936a37.128258 37.128258 0 0 1 0 74.223483h-411.581936a37.062194 37.062194 0 0 1-37.095225-37.095225z m448.578064 200.406709H393.645419a37.128258 37.128258 0 0 0 0 74.223484h411.581936a37.128258 37.128258 0 1 0-0.099097-74.223484z m0 237.501936H393.645419a37.128258 37.128258 0 0 0 0 74.223484h411.581936a37.128258 37.128258 0 1 0-0.099097-74.223484zM233.472 468.958968c-28.572903 0-51.794581 23.518968-51.794581 52.620387 0 29.068387 23.155613 52.620387 51.794581 52.620387a52.190968 52.190968 0 0 0 51.827613-52.620387 52.190968 52.190968 0 0 0-51.827613-52.620387z m0-240.64C204.899097 228.318968 181.677419 251.837935 181.677419 280.939355s23.155613 52.620387 51.794581 52.620387a52.190968 52.190968 0 0 0 51.827613-52.620387c0-29.002323-23.25471-52.620387-51.827613-52.620387z m0 473.68258A52.190968 52.190968 0 0 0 181.677419 754.621935c0 29.101419 23.155613 52.620387 51.794581 52.620388a52.190968 52.190968 0 0 0 51.827613-52.620388 52.190968 52.190968 0 0 0-51.827613-52.620387z" fill="#418BFF" p-id="4987"></path></svg>
            </span> 
            主要功能
          </h2>
          <div class="space-y-2">
            <NuxtLink to="/" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              首页
            </NuxtLink>
            <NuxtLink to="/archive" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              文章归档
            </NuxtLink>
          </div>
        </div>

        <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 80ms">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span>
              <svg t="1777919792159" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7127" width="20" height="20"><path d="M528.5888 547.84A226.3552 226.3552 0 1 0 286.72 547.84a339.3024 339.3024 0 0 0-217.9072 316.416 28.16 28.16 0 0 0 56.32 0 282.8288 282.8288 0 0 1 266.24-281.9584c5.12 0.4096 10.8032 0.6656 16.3328 0.6656s10.9056 0 16.3328-0.6656a282.8288 282.8288 0 0 1 266.24 281.9584 28.16 28.16 0 1 0 56.32 0 339.3536 339.3536 0 0 0-218.0096-316.416zM237.7216 356.5056a170.0352 170.0352 0 1 1 185.8048 169.2672c-5.12 0-10.24-0.3584-15.7696-0.3584s-10.5472 0-15.8208 0.3584a170.24 170.24 0 0 1-154.2144-169.2672z" fill="#4E8CEE" p-id="7128"></path><path d="M793.2416 528.7424a187.8016 187.8016 0 0 0-109.0048-340.7872 28.16 28.16 0 0 0 0 56.32A131.584 131.584 0 0 1 696.7808 506.88c-4.1984 0-8.3456-0.3072-12.544-0.3072a28.16 28.16 0 0 0-28.16 28.16v0.9216a28.16 28.16 0 0 0 28.16 28.16c4.4032 0 8.7552 0 13.1072-0.512a222.464 222.464 0 0 1 208.896 221.696 28.16 28.16 0 0 0 56.32 0 278.9376 278.9376 0 0 0-169.3184-256.256z" fill="#4E8CEE" p-id="7129"></path></svg>
            </span> 
            关于
          </h2>
          <div class="space-y-2">
            <NuxtLink to="/about" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              关于本站
            </NuxtLink>
          </div>
        </div>

        <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 160ms">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span>⚖️</span> 法律文档
          </h2>
          <div class="space-y-2">
            <NuxtLink to="/disclaimer" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              免责声明
            </NuxtLink>
            <NuxtLink to="/privacy" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              隐私协议
            </NuxtLink>
            <NuxtLink to="/service-protocol" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group">
              <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
              用户协议
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="lg:w-2/3">
        <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 md:p-6 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 240ms">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
            <span class="flex items-center gap-2"><span>📄</span> 全部文章</span>
            <span class="text-xs font-normal text-gray-400 dark:text-gray-500">{{ articles.length }} 篇</span>
          </h2>
          <div v-if="articles.length === 0" class="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">暂无文章</div>
          <div v-else class="divide-y divide-gray-50 dark:divide-gray-800">
            <NuxtLink
              v-for="(article, idx) in articles"
              :key="article.slug"
              :to="'/article/' + article.slug"
              class="flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group no-underline"
            >
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <span class="text-xs text-gray-300 dark:text-gray-600 flex-shrink-0 w-6 text-right">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors truncate">{{ article.title }}</span>
              </div>
              <span class="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4">{{ formatDate(article.date) }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'SitemapPage',
  components: { SimpleFooter },
  data() {
    return {
      loaded: false,
    }
  },
  computed: {
    articles() {
      const all = this.$store.state.articles || []
      return [...all].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    },
  },
  mounted() {
    setTimeout(() => { this.loaded = true }, 50)
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    },
  },
}
</script>

<style scoped>
.article-fade-in {
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
}

.article-fade-in.is-loaded {
  opacity: 1;
  transform: translateX(0);
}
</style>
