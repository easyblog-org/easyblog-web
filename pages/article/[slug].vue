<template>
  <transition name="toast">
    <div v-if="showToast" class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none">
      链接已复制到剪贴板
    </div>
  </transition>
  <PageContainer has-sidebar>
    <article :class="['bg-white dark:bg-gray-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 dark:lg:border-gray-800 p-6 lg:p-8']">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{{ article.title || '加载中...' }}</h1>
      <div :class="['flex items-center gap-3 mb-6 text-sm text-gray-400 dark:text-gray-500 flex-wrap', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 80ms">
        <span>{{ formatDate(article.date) }}</span>
        <span v-if="article.category">· {{ article.category }}</span>
        <span>· {{ viewCount }} 次阅读</span>
        <span>· 阅读约 {{ readingTime }} 分钟</span>
      </div>

      <div class="nuxt-content prose prose-sm dark:prose-invert max-w-none page-slide-up" :class="{ 'is-loaded': loaded }" style="transition-delay: 160ms">
        <div v-html="renderedBody" class="text-gray-700 dark:text-gray-300 leading-relaxed"></div>
      </div>

      <div :class="['mt-8 pt-6 border-t border-gray-100 dark:border-gray-800', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 200ms">
        <div class="flex items-center justify-between">
          <button
            class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            @click="handleToggleLike"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.16m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            <span>分享</span>
          </button>
        </div>
      </div>
    </article>

    <div v-if="prevArticle || nextArticle" :class="['mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 260ms">
      <NuxtLink
        v-if="prevArticle"
        :to="'/article/' + prevArticle.slug"
        class="lg:bg-white dark:lg:bg-gray-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 dark:lg:border-gray-800 p-4 no-underline hover:opacity-80 transition-opacity group"
      >
        <span class="text-xs text-gray-400 dark:text-gray-500">← 上一篇</span>
        <p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1">{{ prevArticle.title }}</p>
      </NuxtLink>
      <div v-else class="hidden sm:block"></div>
      <NuxtLink
        v-if="nextArticle"
        :to="'/article/' + nextArticle.slug"
        class="lg:bg-white dark:lg:bg-gray-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 dark:lg:border-gray-800 p-4 no-underline hover:opacity-80 transition-opacity group text-right"
      >
        <span class="text-xs text-gray-400 dark:text-gray-500">下一篇 →</span>
        <p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1">{{ nextArticle.title }}</p>
      </NuxtLink>
    </div>

    <div :class="['mt-8 bg-white dark:bg-gray-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 dark:lg:border-gray-800 p-6 lg:p-8', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 320ms">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-sm">评论</h3>
      <p class="text-sm text-gray-400 dark:text-gray-500">评论功能即将上线，敬请期待...</p>
    </div>

    <div v-if="relatedArticles.length > 0" :class="['mt-6 lg:hidden bg-white dark:bg-gray-900 p-6 lg:p-8', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 340ms">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">📌 推荐阅读</h3>
      <div class="space-y-3">
        <NuxtLink
          v-for="ra in relatedArticles"
          :key="ra.slug"
          :to="'/article/' + ra.slug"
          class="block group no-underline pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
        >
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{{ ra.title }}</p>
          <span v-if="ra.category" class="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{{ ra.category }}</span>
        </NuxtLink>
      </div>
    </div>

    <div v-if="article.tags && article.tags.length > 0" :class="['mt-6 lg:hidden bg-white dark:bg-gray-900 p-6 lg:p-8', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 360ms">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">🏷️ 文章标签</h3>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in article.tags" :key="tag" class="text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full">{{ tag }}</span>
      </div>
    </div>

    <template #sidebar>
      <div :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 200ms">
        <PostTOC :headings="tocHeadings" />
      </div>

      <div v-if="relatedArticles.length > 0" :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 280ms">
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

      <div v-if="article.tags && article.tags.length > 0" :class="['bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4', 'page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 360ms">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">🏷️ 文章标签</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" :key="tag" class="text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full">{{ tag }}</span>
        </div>
      </div>

      <div :class="['page-slide-up', { 'is-loaded': loaded }]" style="transition-delay: 420ms">
        <AuthorCard />
      </div>
    </template>
  </PageContainer>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { getViewCount, getLikeCount, toggleLike, getLikedStatus } from '~/utils/stats.js'
import { useBlogStore } from '~/store/blog'
import PageContainer from '~/components/common/PageContainer.vue'

const renderer = new marked.Renderer()
renderer.code = function({ text, lang }) {
  const language = lang || 'plaintext'
  let highlighted
  try {
    highlighted = hljs.highlight(text, { language }).value
  } catch (e) {
    highlighted = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  const lines = text.split('\n')
  const lineNumbersHtml = lines.map((_, i) => `<span class="ln">${i + 1}</span>`).join('')
  const codeId = 'code-' + Math.random().toString(36).substr(2, 9)

  return `
    <figure class="code-block" data-lang="${language}">
      <figcaption class="code-header">
        <span class="code-lang-dot">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </span>
        <span class="code-lang-name">${language}</span>
        <button class="code-copy" data-target="${codeId}" onclick="const t=this;const c=document.getElementById(t.dataset.target);navigator.clipboard.writeText(c.textContent).then(()=>{t.classList.add('copied');t.innerHTML='<svg viewBox=\'0 0 24 24\' width=\'14\' height=\'14\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'><polyline points=\'20 6 9 17 4 12\'/></svg>已复制';setTimeout(()=>{t.classList.remove(\'copied\');t.innerHTML=\'<svg viewBox=\'\\\'0 0 24 24\\\' width=\\\'14\\\' height=\\\'14\\\' fill=\\\'none\\\' stroke=\\\'currentColor\\\' stroke-width=\\\'2\\\'><rect x=\\\'9\\\' y=\\\'9\\\' width=\\\'13\\\' height=\\\'13\\\' rx=\\\'2\\\' ry=\\\'2\\\'></rect><path d=\\\'M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1\\\'></path></svg>复制代码\';},2000)})">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
          复制代码
        </button>
      </figcaption>
      <div class="code-body">
        <div class="line-numbers" aria-hidden="true">${lineNumbersHtml}</div>
        <pre class="code-pre"><code id="${codeId}" class="hljs language-${language}">${highlighted}</code></pre>
      </div>
    </figure>
  `
}

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
})

const route = useRoute()
const blogStore = useBlogStore()

const slug = computed(() => route.params.slug)

const { data: apiData } = await useFetch('/api/articles', {
  key: 'articles-data',
})

const allArticles = computed(() => {
  const storeArticles = blogStore.articles || []
  if (storeArticles.length > 0) return storeArticles
  return apiData.value?.articles || []
})

const article = computed(() => {
  const articles = allArticles.value || []
  const found = articles.find((a) => a.slug === slug.value)
  if (found) {
    return { ...found, _rawBody: found.content || found.body || '' }
  }
  return { title: '文章未找到', slug: slug.value, date: '', _rawBody: '', tags: [], category: '' }
})

const renderedBody = computed(() => {
  const body = article.value._rawBody || ''
  if (!body) return ''
  return marked.parse(body)
})

const currentIndex = computed(() => allArticles.value.findIndex((a) => a.slug === slug.value))

const prevArticle = computed(() => {
  if (currentIndex.value > 0) return allArticles.value[currentIndex.value - 1]
  return null
})

const nextArticle = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < allArticles.value.length - 1) return allArticles.value[currentIndex.value + 1]
  return null
})

const tocHeadings = ref([])
const viewCount = ref(0)
const likeCount = ref(0)
const liked = ref(false)
const loaded = ref(false)
const showToast = ref(false)

const readingTime = computed(() => {
  let body = article.value._rawBody || ''
  if (!body) {
    body = article.value.content || article.value.body || ''
  }
  if (!body) return 1
  const text = String(body).replace(/[#*`\-()[\]{}>!|\\]/g, '').replace(/\s+/g, '')
  const charCount = text.length
  const minutes = Math.max(1, Math.ceil(charCount / 300))
  return minutes
})

const relatedArticles = computed(() => {
  const all = allArticles.value || []
  const currentSlug = article.value.slug || ''
  const currentTags = article.value.tags || []
  const currentCategory = article.value.category || ''
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
})

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function extractHeadings() {
  const container = document.querySelector('.nuxt-content')
  if (!container) return
  const headingEls = container.querySelectorAll('h2, h3')
  const headings = []
  headingEls.forEach((el) => {
    if (!el.id) el.id = 'heading-' + Math.random().toString(36).substr(2, 9)
    headings.push({ id: el.id, text: el.textContent, level: parseInt(el.tagName.charAt(1)) })
  })
  tocHeadings.value = headings
}

async function loadViewCount() {
  try {
    viewCount.value = await getViewCount(article.value.slug)
  } catch (e) {
    console.warn('[ArticleDetail] loadViewCount failed:', e.message)
    viewCount.value = 0
  }
}

async function loadLikeCount() {
  try {
    likeCount.value = await getLikeCount(article.value.slug)
    liked.value = await getLikedStatus(article.value.slug)
  } catch (e) {
    console.warn('[ArticleDetail] loadLikeCount failed:', e.message)
    likeCount.value = 0
    liked.value = false
  }
}

async function handleToggleLike() {
  try {
    const result = await toggleLike(article.value.slug)
    likeCount.value = result.count
    liked.value = result.liked
  } catch (e) {
    console.warn('[ArticleDetail] toggleLike API failed:', e.message)
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  })
}


onMounted(() => {
  loadViewCount()
  loadLikeCount()
  setTimeout(() => { loaded.value = true }, 50)
  nextTick(() => {
    setTimeout(() => extractHeadings(), 300)
  })
})
</script>

<style scoped>
.page-slide-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.page-slide-up.is-loaded {
  opacity: 1;
  transform: translateY(0);
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
