<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <Breadcrumb :items="[{ text: '首页', href: '/' }, { text: '文章归档' }]" />
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">文章归档</h1>
    <div v-if="groupedArticles.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12">暂无文章</div>
    <div v-for="group in groupedArticles" :key="group.year" class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ group.year }}</h2>
      <div class="space-y-2 pl-4">
        <div v-for="article in group.articles" :key="article.slug" class="flex items-center">
          <span class="text-sm text-gray-400 dark:text-gray-500 w-16 flex-shrink-0">{{ formatDate(article.date) }}</span>
          <NuxtLink :to="'/article/' + article.slug" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors no-underline">{{ article.title }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'

export default {
  name: 'ArchivePage',
  components: { Breadcrumb },
  computed: {
    articles() {
      return this.$store ? this.$store.state.articles || [] : []
    },
    groupedArticles() {
      const map = {}
      for (const a of this.articles) {
        const dateStr = a.date ? String(a.date) : ''
        const year = dateStr ? dateStr.substring(0, 4) : '未知'
        if (!map[year]) map[year] = []
        map[year].push(a)
      }
      return Object.keys(map)
        .sort((a, b) => b.localeCompare(a))
        .map((year) => ({ year, articles: map[year] }))
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      return String(date).substring(5)
    },
  },
}
</script>
