<template>
  <div>
    <div v-if="navCategories.length > 0" class="lg:hidden jj-nav-bar">
      <div class="jj-nav-scroll">
        <button
          :class="['jj-nav-tab', { 'jj-nav-tab--active': !activeCategory }]"
          @click="selectCategory('')"
        >全部</button>
        <button
          v-for="cat in navCategories"
          :key="cat.name"
          :class="['jj-nav-tab', { 'jj-nav-tab--active': activeCategory === cat.name }]"
          @click="selectCategory(cat.name)"
        >{{ cat.name }}</button>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 pt-4 pb-6">
    <div class="lg:hidden">

      <div v-if="filteredArticles.length === 0" class="text-center py-16 px-4">
        <div v-if="$route.query.q" class="empty-state">
          <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">没有找到相关文章</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">搜索「<span class="text-primary font-medium">{{ $route.query.q }}</span>」未匹配到任何内容</p>
          <button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" @click="$router.push({ query: {} })">
            返回首页
          </button>
        </div>

        <div v-else-if="$route.query.category || $route.query.tag" class="empty-state">
          <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">该分类下暂无文章</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">尝试切换其他分类或浏览全部文章</p>
          <button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" @click="$router.push('/')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            返回首页
          </button>
        </div>

        <div v-else class="empty-state">
          <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
          <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">文章正在路上</p>
          <p class="text-sm text-gray-400 dark:text-gray-500">作者还在努力创作中，敬请期待</p>
        </div>
      </div>

      <template v-else>
        <div v-if="heroArticles.length > 0 && !activeCategory" class="relative mb-3">
          <div class="overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 pb-2 pl-2 pr-5">
            <NuxtLink
              v-for="(article, idx) in heroArticles"
              :key="article.slug"
              :to="'/article/' + article.slug"
              :class="['flex-shrink-0 w-[calc(100%-1rem)] no-underline group snap-start mobile-card overflow-hidden', idx === heroArticles.length - 1 ? 'mr-4' : '']"
            >
              <div class="relative rounded-[var(--radius-card)] overflow-hidden h-full">
                <div v-if="article.cover" class="aspect-[16/9] w-full overflow-hidden">
                  <img :src="article.cover" :alt="article.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div class="absolute bottom-0 left-0 right-0 p-5">
                    <div class="flex items-center gap-2 mb-2">
                      <span v-if="article.category" class="mobile-hero-tag text-white font-medium">{{ article.category }}</span>
                    </div>
                    <h2 class="text-[20px] font-bold text-white leading-snug line-clamp-2" style="text-shadow: 0 1px 3px rgba(0,0,0,0.3)">{{ article.title }}</h2>
                    <p v-if="article.summary" class="mt-1.5 text-[13px] text-white/80 leading-relaxed line-clamp-2">{{ article.summary }}</p>
                  </div>
                </div>
                <div v-else class="relative overflow-hidden p-6 pb-7 min-h-[160px]" style="background: var(--gradient-hero)">
                  <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
                  <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
                  <div class="absolute top-1/2 right-8 w-2 h-20 bg-white/20 rounded-full -translate-y-1/2 rotate-12"></div>
                  <div class="absolute top-8 left-12 w-16 h-2 bg-white/15 rounded-full rotate-[-20deg]"></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="mobile-hero-tag inline-flex items-center gap-1 text-white font-semibold">★ 精选</span>
                      <span v-if="article.category" class="mobile-hero-tag text-white/80">{{ article.category }}</span>
                      <span class="text-xs text-white/60">{{ formatDate(article.date) }}</span>
                    </div>
                    <h2 class="text-[20px] font-bold text-white leading-snug line-clamp-2" style="text-shadow: 0 1px 3px rgba(0,0,0,0.2)">{{ article.title }}</h2>
                    <p v-if="article.summary" class="mt-2 text-[13px] text-white/80 leading-relaxed line-clamp-2">{{ article.summary }}</p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="jj-feed-list">
          <NuxtLink
            v-for="(article, idx) in visibleRestArticles"
            :key="article.slug"
            :to="'/article/' + article.slug"
            class="jj-feed-item animate-fade-in-up"
            :style="{ animationDelay: (idx % 10) * 0.05 + 's' }"
          >
            <div class="jj-feed-body" :class="{ 'jj-feed-body--has-cover': article.cover }">
              <div class="jj-feed-content">
                <h3 class="jj-feed-title" :title="article.title">
                  {{ article.title }}
                  <span v-if="article.featured" class="jj-feed-badge">★</span>
                </h3>
                <p v-if="article.summary" class="jj-feed-summary">{{ article.summary }}</p>
                <div class="jj-feed-meta">
                  <div class="jj-feed-author">
                    <div class="jj-avatar jj-avatar--sm">
                      <span class="jj-avatar-text">{{ (article.author || article.category || '博').charAt(0) }}</span>
                    </div>
                    <span class="jj-author-name">{{ article.author || article.category || 'EasyBlog' }}</span>
                  </div>
                  <div class="jj-feed-stats">
                    <span class="jj-stat-item">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      {{ formatDate(article.date) }}
                    </span>
                    <span class="jj-stat-item">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      {{ article.views || Math.floor(Math.random() * 9000 + 1000).toLocaleString() }}
                    </span>
                    <span class="jj-stat-item">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                      {{ article.likes || Math.floor(Math.random() * 500 + 10) }}
                    </span>
                  </div>
                  <button class="jj-more-btn" @click.prevent>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </button>
                </div>
              </div>
              <div v-if="article.cover" class="jj-feed-cover">
                <img :src="article.cover" :alt="article.title" loading="lazy"/>
              </div>
            </div>
          </NuxtLink>

          <div ref="scrollSentinel" class="jj-sentinel"></div>
        </div>

        <div v-if="allLoaded && visibleRestArticles.length > 0" class="py-8 text-center">
          <span class="text-xs tracking-widest" style="color: var(--color-meta)">— 已经到底了 —</span>
        </div>
      </template>
    </div>

    <div class="hidden lg:flex flex-row gap-6">
      <div class="lg:w-3/4">
        <div v-if="filteredArticles.length === 0" class="text-center py-16 px-4">
          <div v-if="$route.query.q" class="empty-state">
            <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">没有找到相关文章</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">搜索「<span class="text-primary font-medium">{{ $route.query.q }}</span>」未匹配到任何内容</p>
            <button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" @click="$router.push('/')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              返回首页
            </button>
          </div>

          <div v-else-if="$route.query.category || $route.query.tag" class="empty-state">
            <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">该分类下暂无文章</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">尝试切换其他分类或浏览全部文章</p>
            <button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" @click="$router.push('/')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              返回首页
            </button>
          </div>

          <div v-else class="empty-state">
            <svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
            <p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">文章正在路上</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">作者还在努力创作中，敬请期待</p>
          </div>
        </div>
        <ArticleList v-else :articles="filteredArticles" />
      </div>
      <div class="lg:w-1/4">
        <div class="sticky top-20">
          <Sidebar :categories="categories" :tags="tags" :collections="collections" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ArticleList from '~/components/article/ArticleList.vue'
import Sidebar from '~/components/layout/Sidebar.vue'

const CATEGORY_COLORS = {
  '前端': '#667eea',
  '后端': '#764ba2',
  'AI': '#f093fb',
  'DevOps': '#4facfe',
  '架构': '#43e97b',
  '生活': '#fa709a',
}

export default {
  name: 'HomePage',
  components: { ArticleList, Sidebar },
  data() {
    return {
      currentHeroIndex: 0,
      _heroScrollEl: null,
      _scrollObserver: null,
      displayCount: 10,
      pageSize: 10,
    }
  },
  computed: {
    allArticles() {
      return this.$store ? this.$store.state.articles || [] : []
    },
    categories() {
      return this.$store ? this.$store.state.categories || [] : []
    },
    tags() {
      return this.$store ? this.$store.state.tags || [] : []
    },
    collections() {
      return [
        { slug: 'backend-practice', title: '后端工程实践', description: '从零构建高可用后端系统', price: '¥99', articleCount: 12 },
        { slug: 'ai-exploration', title: 'AI 探索笔记', description: 'AI 应用开发实战记录', price: '¥49', articleCount: 8 },
      ]
    },
    filteredArticles() {
      let result = this.allArticles
      const category = this.$route.query.category
      const tag = this.$route.query.tag
      const q = this.$route.query.q
      if (category) result = result.filter((a) => a.category === category)
      if (tag) result = result.filter((a) => a.tags && a.tags.includes(tag))
      if (q) {
        const lower = q.toLowerCase()
        result = result.filter(
          (a) =>
            (a.title && a.title.toLowerCase().includes(lower)) ||
            (a.summary && a.summary.toLowerCase().includes(lower))
        )
      }
      return [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    heroArticles() {
      const allFeatured = [...this.filteredArticles].filter((a) => a.featured).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
      if (allFeatured.length > 0) return allFeatured
      return this.filteredArticles.slice(0, 1)
    },
    restArticles() {
      const heroSlugs = new Set(this.heroArticles.map((a) => a.slug))
      const rest = this.filteredArticles.filter((a) => !heroSlugs.has(a.slug))
      const extraFeatured = rest.filter((a) => a.featured).sort((a, b) => new Date(b.date) - new Date(a.date))
      const normal = rest.filter((a) => !a.featured)
      return [...extraFeatured, ...normal]
    },
    visibleRestArticles() {
      if (this.activeCategory) return this.filteredArticles
      return this.restArticles.slice(0, this.displayCount)
    },
    allLoaded() {
      if (this.activeCategory) return true
      return this.displayCount >= this.restArticles.length
    },
    filterLabel() {
      const category = this.$route.query.category
      const tag = this.$route.query.tag
      const q = this.$route.query.q
      if (category) return '分类: ' + category
      if (tag) return '标签: ' + tag
      if (q) return '搜索: ' + q
      return ''
    },
    activeCategory() {
      return this.$route.query.tag || ''
    },
    navCategories() {
      return (this.tags || []).slice(0, 12)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._heroScrollEl = this.$el.querySelector('.overflow-x-auto')
      if (this._heroScrollEl) {
        this._heroScrollEl.addEventListener('scroll', this.onHeroScroll, { passive: true })
      }
      this.initScrollObserver()
    })
  },
  beforeDestroy() {
    if (this._heroScrollEl) {
      this._heroScrollEl.removeEventListener('scroll', this.onHeroScroll)
    }
    if (this._scrollObserver) {
      this._scrollObserver.disconnect()
      this._scrollObserver = null
    }
  },
  methods: {
    getCategoryColor(category) {
      return CATEGORY_COLORS[category] || '#667eea'
    },
    loadMore() {
      if (this.allLoaded) return
      this.displayCount += this.pageSize
    },
    initScrollObserver() {
      if (!('IntersectionObserver' in window)) return
      const observeSentinel = () => {
        const sentinel = this.$refs.scrollSentinel
        if (!sentinel) return
        if (this._scrollObserver) this._scrollObserver.disconnect()
        this._scrollObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.allLoaded) {
              this.loadMore()
            }
          })
        }, { rootMargin: '100px' })
        this._scrollObserver.observe(sentinel)
      }
      this.$nextTick(observeSentinel)
    },
    scrollToHero(idx) {
      if (!this._heroScrollEl) return
      const cards = this._heroScrollEl.querySelectorAll('a[rel][class]')
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
    },
    onHeroScroll() {
      if (!this._heroScrollEl) return
      const scrollLeft = this._heroScrollEl.scrollLeft
      const cardWidth = this._heroScrollEl.querySelector('a[rel][class]')?.offsetWidth || 0
      if (cardWidth > 0) {
        this.currentHeroIndex = Math.round(scrollLeft / cardWidth)
      }
    },
    clearFilter() {
      this.$router.push({ path: '/' })
    },
    selectCategory(name) {
      if (name) {
        this.$router.push({ query: { tag: name } })
      } else {
        this.$router.push({ path: '/' })
      }
      this.displayCount = 10
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    },
    handleSubscribe(col) {
      alert('订阅专栏：' + col.title + '（功能开发中）')
    },
  },
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.jj-feed-list {
  background: #fff;
  border-radius: var(--radius-card);
  overflow: hidden;
}

.dark .jj-feed-list {
  background: var(--color-card-bg);
}

.jj-feed-item {
  display: block;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.15s ease;
}

.dark .jj-feed-item {
  border-bottom-color: #1f2937;
}

.jj-feed-item:last-child {
  border-bottom: none;
}

.jj-feed-item:active {
  background-color: #f7f8fa;
}

.dark .jj-feed-item:active {
  background-color: rgba(255,255,255,0.03);
}

.jj-feed-body {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 15px 16px;
}

.jj-feed-body--has-cover .jj-feed-content {
  flex: 1;
  min-width: 0;
}

.jj-feed-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jj-feed-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: #1a1a1a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.dark .jj-feed-title {
  color: #f0f0f0;
}

.jj-feed-badge {
  color: #f59e0b;
  font-size: 14px;
  margin-left: 2px;
  vertical-align: middle;
}

.jj-feed-summary {
  font-size: 13px;
  line-height: 1.6;
  color: #888;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  margin-top: 2px;
}

.dark .jj-feed-summary {
  color: #999;
}

.jj-feed-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.jj-feed-author {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.jj-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.jj-avatar--sm {
  width: 22px;
  height: 22px;
}

.jj-avatar-text {
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.jj-author-name {
  font-size: 12px;
  color: #666;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .jj-author-name {
  color: #aaa;
}

.jj-feed-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.jj-stat-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: #999;
}

.dark .jj-stat-item {
  color: #777;
}

.jj-more-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #bbb;
  cursor: pointer;
  flex-shrink: 0;
  border: none;
  background: transparent;
  padding: 0;
  transition: all 0.15s ease;
}

.jj-more-btn:hover {
  background-color: #f0f0f0;
  color: #666;
}

.dark .jj-more-btn:hover {
  background-color: rgba(255,255,255,0.08);
  color: #ccc;
}

.jj-feed-cover {
  width: 96px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
}

.jj-feed-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.jj-sentinel {
  height: 1px;
}

.jj-nav-bar {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.dark .jj-nav-bar {
  background: var(--color-card-bg);
  border-bottom-color: #1f2937;
}

.jj-nav-scroll {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding: 0 4px;
}

.jj-nav-scroll::-webkit-scrollbar {
  display: none;
}

.jj-nav-tab {
  flex-shrink: 0;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.dark .jj-nav-tab {
  color: #aaa;
}

.jj-nav-tab:hover {
  color: #1a1a1a;
}

.dark .jj-nav-tab:hover {
  color: #e5e5e5;
}

.jj-nav-tab--active {
  color: var(--color-primary, #1e80ff);
  font-weight: 600;
}

.jj-nav-tab--active::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: var(--color-primary, #1e80ff);
  border-radius: 2px;
}
</style>
