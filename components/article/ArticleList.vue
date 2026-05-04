<template>
  <div class="jj-desktop-feed">
    <div
      v-for="article in visibleArticles"
      :key="article.slug"
      class="jj-desktop-item"
    >
      <NuxtLink :to="'/article/' + article.slug" class="jj-desktop-body" :class="{ 'jj-desktop-body--cover': article.cover }">
        <div class="jj-desktop-content">
          <h3 class="jj-desktop-title">
            {{ article.title }}
            <span v-if="article.featured" class="jj-desktop-badge">★</span>
          </h3>
          <p v-if="article.summary" class="jj-desktop-summary">{{ article.summary }}</p>
          <div class="jj-desktop-meta">
            <div class="jj-desktop-author">
              <div class="jj-avatar jj-avatar--md">
                <span class="jj-avatar-text">{{ (article.author || article.category || '博').charAt(0) }}</span>
              </div>
              <span class="jj-author-name">{{ article.author || article.category || 'EasyBlog' }}</span>
            </div>
            <div class="jj-desktop-stats">
              <span class="jj-stat-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ formatDate(article.date) }}
              </span>
              <span class="jj-stat-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                {{ article.views || Math.floor(Math.random() * 90000 + 1000).toLocaleString() }}
              </span>
              <span class="jj-stat-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                {{ article.likes || Math.floor(Math.random() * 500 + 10) }}
              </span>
            </div>
            <div v-if="article.tags && article.tags.length" class="jj-desktop-tags">
              <template v-for="(tag, tIdx) in displayTags(article.tags)">
                <a
                  v-if="tag !== '...'"
                  :key="'t-' + tIdx"
                  href="#"
                  class="jj-tag-pill"
                  @click.prevent="goTag(tag)"
                >{{ tag }}</a>
                <span v-else :key="'ellipsis-' + tIdx" class="jj-tag-ellipsis">...</span>
              </template>
            </div>
          </div>
        </div>
        <div v-if="article.cover" class="jj-desktop-cover">
          <img :src="article.cover" :alt="article.title" loading="lazy"/>
        </div>
      </NuxtLink>
    </div>

    <div ref="scrollSentinel" class="jj-sentinel"></div>

    <div v-if="allLoaded && articles.length > pageSize" class="py-8 text-center">
      <span class="text-xs tracking-widest text-gray-400 dark:text-gray-600">— 已经到底了 —</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articles: { type: Array, default: () => [] },
    showLoadMore: { type: Boolean, default: true },
    pageSize: { type: Number, default: 10 },
  },
  data() {
    return {
      displayCount: 10,
      _scrollObserver: null,
    }
  },
  computed: {
    visibleArticles() {
      if (!this.showLoadMore) return this.articles
      return this.articles.slice(0, this.displayCount)
    },
    allLoaded() {
      return this.displayCount >= this.articles.length
    },
  },
  watch: {
    articles() {
      this.displayCount = this.pageSize
      this.$nextTick(() => this.initScrollObserver())
    },
  },
  mounted() {
    this.displayCount = this.pageSize
    this.$nextTick(() => this.initScrollObserver())
  },
  beforeDestroy() {
    if (this._scrollObserver) {
      this._scrollObserver.disconnect()
      this._scrollObserver = null
    }
  },
  methods: {
    initScrollObserver() {
      if (!('IntersectionObserver' in window)) return
      const sentinel = this.$refs.scrollSentinel
      if (!sentinel) return
      if (this._scrollObserver) this._scrollObserver.disconnect()
      this._scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.allLoaded) {
            this.loadMore()
          }
        })
      }, { rootMargin: '120px' })
      this._scrollObserver.observe(sentinel)
    },
    loadMore() {
      if (this.allLoaded) return
      this.displayCount += this.pageSize
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    },
    displayTags(tags) {
      if (!tags || !tags.length) return []
      if (tags.length <= 5) return tags
      return [...tags.slice(0, 5), '...']
    },
    goTag(tag) {
      this.$router.push({ path: '/', query: { tag } })
    },
  },
}
</script>

<style scoped>
.jj-desktop-feed {
  background: #fff;
  border-radius: var(--radius-card);
  overflow: hidden;
  animation: feed-fade-in 0.5s ease-out both;
}

@keyframes feed-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.dark .jj-desktop-feed {
  background: var(--color-card-bg);
}

.jj-desktop-item {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.15s ease;
}

.dark .jj-desktop-item {
  border-bottom-color: #1f2937;
}

.jj-desktop-item:last-child {
  border-bottom: none;
}

.jj-desktop-item:hover {
  background-color: #fafbfc;
}

.dark .jj-desktop-item:hover {
  background-color: rgba(255,255,255,0.02);
}

.jj-desktop-body {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 22px;
  text-decoration: none;
}

.jj-desktop-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.jj-desktop-title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.55;
  color: #1a1a1a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.dark .jj-desktop-title {
  color: #f0f0f0;
}

.jj-desktop-badge {
  color: #f59e0b;
  font-size: 15px;
  margin-left: 3px;
  vertical-align: middle;
}

.jj-desktop-summary {
  font-size: 14px;
  line-height: 1.65;
  color: #888;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.dark .jj-desktop-summary {
  color: #999;
}

.jj-desktop-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 2px;
  flex-wrap: wrap;
}

.jj-desktop-author {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.jj-avatar {
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.jj-avatar--md {
  width: 26px;
  height: 26px;
}

.jj-avatar-text {
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
}

.jj-author-name {
  font-size: 13px;
  color: #666;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .jj-author-name {
  color: #aaa;
}

.jj-desktop-stats {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.jj-stat-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #999;
}

.dark .jj-stat-item {
  color: #777;
}

.jj-desktop-cover {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
}

.jj-desktop-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.jj-sentinel {
  height: 1px;
}

.jj-desktop-tags {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  margin-left: auto;
}

.jj-tag-pill {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 1;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: #f0f2f5;
  color: #666;
  text-decoration: none;
  transition: all 0.15s ease;
}

.jj-tag-pill:hover {
  background-color: #e8e9ec;
  color: var(--color-primary, #1e80ff);
}

.dark .jj-tag-pill {
  background-color: rgba(255,255,255,0.06);
  color: #999;
}

.dark .jj-tag-pill:hover {
  background-color: rgba(255,255,255,0.1);
  color: var(--color-primary, #1e80ff);
}

.jj-tag-ellipsis {
  font-size: 12px;
  color: #bbb;
}

.jj-desktop-item {
  contain: layout style;
}
</style>
