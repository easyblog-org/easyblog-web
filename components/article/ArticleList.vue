<template>
  <div class="space-y-4">
    <div
      v-for="article in paginatedArticles"
      :key="article.slug"
      class="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 p-5 transition-shadow duration-200"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div v-if="article.cover" class="md:w-1/4 flex-shrink-0">
          <img :src="article.cover" :alt="article.title" class="w-full h-48 md:h-28 object-cover rounded-lg" />
        </div>
        <div :class="article.cover ? 'md:w-3/4' : 'w-full'" class="flex flex-col">
          <div class="flex items-start justify-between gap-2">
            <NuxtLink :to="'/article/' + article.slug" class="text-lg font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors no-underline line-clamp-2">
              {{ article.title }}
            </NuxtLink>
            <span v-if="article.paid" class="flex-shrink-0 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-medium">付费</span>
            <span v-else-if="article.trial" class="flex-shrink-0 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-medium">试读</span>
          </div>
          <p v-if="article.summary" class="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{{ article.summary }}</p>
          <div class="flex items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
            <span>{{ formatDate(article.date) }}</span>
            <span v-if="article.category" class="bg-primary/10 dark:bg-primary/20 text-primary px-2 py-0.5 rounded-full">{{ article.category }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showLoadMore && hasMore" class="w-full text-center py-4">
      <button class="border border-primary text-primary hover:bg-primary/10 px-6 py-2 rounded-lg transition-colors duration-200 text-sm" @click="loadMore">加载更多</button>
    </div>
    <div v-if="!hasMore && articles.length > 0" class="w-full text-center py-4 text-gray-400 dark:text-gray-600 text-sm">— 已经到底了 —</div>
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
      currentPage: 1,
    }
  },
  computed: {
    paginatedArticles() {
      if (!this.showLoadMore) return this.articles
      return this.articles.slice(0, this.currentPage * this.pageSize)
    },
    hasMore() {
      return this.currentPage * this.pageSize < this.articles.length
    },
  },
  methods: {
    loadMore() {
      this.currentPage++
    },
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
