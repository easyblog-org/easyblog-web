<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div v-if="filterLabel" class="mb-4 flex items-center gap-2">
      <span class="text-sm text-gray-500 dark:text-gray-400">筛选：{{ filterLabel }}</span>
      <button class="text-xs text-primary hover:underline" @click="clearFilter">清除</button>
    </div>
    <div class="flex flex-col-reverse lg:flex-row gap-6">
      <div class="lg:w-3/4">
        <div v-if="filteredArticles.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-16">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p>暂无文章，请先在 content/articles/ 目录下添加 Markdown 文件</p>
        </div>
        <ArticleList v-else :articles="filteredArticles" />
      </div>
      <div class="lg:w-1/4">
        <Sidebar :categories="categories" :tags="tags" :collections="collections" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from '~/components/article/ArticleList.vue'
import Sidebar from '~/components/layout/Sidebar.vue'

export default {
  name: 'HomePage',
  components: { ArticleList, Sidebar },
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
      if (category) {
        result = result.filter((a) => a.category === category)
      }
      if (tag) {
        result = result.filter((a) => a.tags && a.tags.includes(tag))
      }
      if (q) {
        const lower = q.toLowerCase()
        result = result.filter(
          (a) =>
            (a.title && a.title.toLowerCase().includes(lower)) ||
            (a.summary && a.summary.toLowerCase().includes(lower))
        )
      }
      return result
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
  },
  methods: {
    clearFilter() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>
