<template>
  <div class="min-h-screen flex flex-col">
    <transition name="toast">
      <div v-if="showToast" class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none">
        链接已复制到剪贴板
      </div>
    </transition>
    <div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
    <div class="flex flex-col-reverse lg:flex-row gap-6">
      <div class="lg:w-3/4">
        <article :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 article-fade-in', { 'is-loaded': loaded }]">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{{ article.title || '加载中...' }}</h1>
          <div :class="['flex items-center gap-3 mb-6 text-sm text-gray-400 dark:text-gray-500 flex-wrap article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 80ms">
            <span>{{ formatDate(article.date) }}</span>
            <span v-if="article.category">· {{ article.category }}</span>
            <span>· {{ viewCount }} 次阅读</span>
            <span>· 阅读约 {{ readingTime }} 分钟</span>
          </div>

          <div v-if="article.collection" :class="['mb-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 120ms">
            <div>
              <span class="text-xs text-primary font-medium">所属专栏</span>
              <p class="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{{ article.collection.title }}</p>
            </div>
            <button class="text-xs bg-primary text-white px-4 py-1.5 rounded-full hover:bg-primary-hover transition-colors" @click="handleSubscribe">订阅专栏</button>
          </div>

          <nuxt-content v-if="!article._rawBody" ref="contentRef" :document="article" class="article-fade-in" :class="{ 'is-loaded': loaded }" style="transition-delay: 160ms" />
          <div v-else ref="contentRef" :class="['nuxt-content prose prose-sm dark:prose-invert max-w-none article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 160ms">
            <div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">{{ article._rawBody }}</div>
          </div>

          <div :class="['mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 200ms">
            <div class="flex items-center justify-between">
              <button
                class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                @click="toggleLike"
              >
                <svg :class="['w-5 h-5', liked ? 'text-red-500 fill-red-500' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>{{ likeCount }}</span>
              </button>
              <button
                class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                @click="copyLink"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                <span>分享</span>
              </button>
            </div>
          </div>
        </article>

        <div v-if="prevArticle || nextArticle" :class="['mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 260ms">
          <NuxtLink
            v-if="prevArticle"
            :to="'/article/' + prevArticle.slug"
            class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 no-underline hover:border-primary/30 dark:hover:border-primary/30 transition-colors group"
          >
            <span class="text-xs text-gray-400 dark:text-gray-500">← 上一篇</span>
            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1">{{ prevArticle.title }}</p>
          </NuxtLink>
          <div v-else class="hidden sm:block"></div>
          <NuxtLink
            v-if="nextArticle"
            :to="'/article/' + nextArticle.slug"
            class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 no-underline hover:border-primary/30 dark:hover:border-primary/30 transition-colors group text-right"
          >
            <span class="text-xs text-gray-400 dark:text-gray-500">下一篇 →</span>
            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1">{{ nextArticle.title }}</p>
          </NuxtLink>
        </div>

        <div :class="['mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 320ms">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-sm">评论</h3>
          <p class="text-sm text-gray-400 dark:text-gray-500">评论功能即将上线，敬请期待...</p>
        </div>
      </div>

      <div class="lg:w-1/4 hidden lg:block">
        <div class="sticky top-20 space-y-4">
          <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 200ms">
            <PostTOC :headings="tocHeadings" />
          </div>

          <div v-if="relatedArticles.length > 0" :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 280ms">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">📌 推荐阅读</h3>
            <div class="space-y-3">
              <NuxtLink
                v-for="ra in relatedArticles"
                :key="ra.slug"
                :to="'/article/' + ra.slug"
                class="block group no-underline"
              >
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{{ ra.title }}</p>
                <span v-if="ra.category" class="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{{ ra.category }}</span>
              </NuxtLink>
            </div>
          </div>

          <div v-if="article.tags && article.tags.length > 0" :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 360ms">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">🏷️ 文章标签</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in article.tags" :key="tag" class="text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full">{{ tag }}</span>
            </div>
          </div>

          <div :class="['article-fade-in', { 'is-loaded': loaded }]" style="transition-delay: 420ms">
            <AuthorCard />
          </div>
        </div>
      </div>
    </div>
    </div>
    <SimpleFooter />
  </div>
</template>

<script>
import PostTOC from '~/components/article/PostTOC.vue'
import AuthorCard from '~/components/article/AuthorCard.vue'
import SimpleFooter from '~/components/layout/SimpleFooter.vue'

export default {
  name: 'ArticleDetailPage',
  components: { PostTOC, AuthorCard, SimpleFooter },
  async asyncData({ params, $content, store }) {
    const slug = params.slug
    let article = {}
    try {
      article = await $content('articles', slug).fetch()
    } catch (e) {
      try {
        const results = await $content('articles', { deep: true }).where({ slug }).limit(1).fetch()
        if (results.length > 0) article = results[0]
      } catch (e2) {
        console.warn('[article] all $content attempts failed, fallback to store:', e2.message)
      }
    }
    if (!article.title) {
      const articles = store.state.articles || []
      const found = articles.find((a) => a.slug === slug)
      if (found) {
        article = { ...found, _rawBody: found.body || '' }
      } else {
        article = { title: '文章未找到', slug, date: '', _rawBody: '' }
      }
    }
    const articles = store.state.articles || []
    const idx = articles.findIndex((a) => a.slug === slug)
    return {
      article,
      prevArticle: idx > 0 ? articles[idx - 1] : null,
      nextArticle: idx < articles.length - 1 ? articles[idx + 1] : null,
    }
  },
  data() {
    return {
      tocHeadings: [],
      viewCount: 0,
      likeCount: 0,
      liked: false,
      loaded: false,
      showToast: false,
    }
  },
  computed: {
    readingTime() {
      let body = this.article._rawBody || ''
      if (!body && typeof this.article.body === 'string') {
        body = this.article.body
      }
      if (!body) return 1
      const text = String(body).replace(/[#*`\-\[\](){}>!|\\]/g, '').replace(/\s+/g, '')
      const charCount = text.length
      const minutes = Math.max(1, Math.ceil(charCount / 300))
      return minutes
    },
    relatedArticles() {
      const all = this.$store.state.articles || []
      const currentSlug = this.article.slug || ''
      const currentTags = this.article.tags || []
      const currentCategory = this.article.category || ''
      return all
        .filter((a) => a.slug !== currentSlug)
        .map((a) => {
          let score = 0
          if (currentCategory && a.category === currentCategory) score += 2
          ;(a.tags || []).forEach((t) => {
            if (currentTags.includes(t)) score += 1
          })
          return { ...a, _score: score }
        })
        .filter((a) => a._score > 0)
        .sort((a, b) => b._score - a._score)
        .slice(0, 5)
    },
  },
  mounted() {
    this.loadViewCount()
    this.loadLikeCount()
    setTimeout(() => { this.loaded = true }, 50)
    this.$nextTick(() => {
      setTimeout(() => this.extractHeadings(), 300)
    })
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
    extractHeadings() {
      const container = this.$refs.contentRef?.$el || document.querySelector('.nuxt-content')
      if (!container) return
      const headingEls = container.querySelectorAll('h2, h3')
      const headings = []
      headingEls.forEach((el) => {
        if (!el.id) el.id = 'heading-' + Math.random().toString(36).substr(2, 9)
        headings.push({ id: el.id, text: el.textContent, level: parseInt(el.tagName.charAt(1)) })
      })
      this.tocHeadings = headings
    },
    loadViewCount() {
      const key = 'view_' + this.article.slug
      let count = parseInt(localStorage.getItem(key) || '0') + 1
      localStorage.setItem(key, String(count))
      this.viewCount = count
    },
    loadLikeCount() {
      const key = 'like_' + this.article.slug
      this.likeCount = parseInt(localStorage.getItem(key) || '0')
      this.liked = localStorage.getItem(key + '_liked') === '1'
    },
    toggleLike() {
      const key = 'like_' + this.article.slug
      if (this.liked) {
        this.likeCount = Math.max(0, this.likeCount - 1)
        localStorage.setItem(key, String(this.likeCount))
        localStorage.removeItem(key + '_liked')
        this.liked = false
      } else {
        this.likeCount++
        localStorage.setItem(key, String(this.likeCount))
        localStorage.setItem(key + '_liked', '1')
        this.liked = true
      }
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 2000)
      })
    },
    handleSubscribe() {
    alert('订阅功能开发中')
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

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px);
}
</style>
