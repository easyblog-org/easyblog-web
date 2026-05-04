<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">文章归档</h1>
    <div v-if="groupedArticles.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      </svg>
      <p>暂无文章</p>
    </div>
    <div v-for="group in groupedArticles" :key="group.yearMonth" class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-lg font-bold text-primary">{{ group.year }}</span>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{{ group.monthName }}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500">{{ group.articles.length }} 篇</span>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
        <div
          v-for="(article, idx) in group.articles"
          :key="article.slug"
          class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div class="flex items-center gap-4 min-w-0">
            <span class="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 w-10 text-right font-mono">{{ formatDay(article.date) }}</span>
            <NuxtLink
              :to="'/article/' + article.slug"
              class="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors no-underline truncate"
            >
              {{ article.title }}
            </NuxtLink>
            <span v-if="article.category" class="hidden sm:inline-block flex-shrink-0 text-[11px] bg-primary/10 dark:bg-primary/20 text-primary px-1.5 py-0.5 rounded">
              {{ article.category }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="articles.length > 0" class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
      <p class="text-sm text-gray-400 dark:text-gray-500">共 {{ articles.length }} 篇文章</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArchivePage',
  computed: {
    articles() {
      return this.$store ? this.$store.state.articles || [] : []
    },
    groupedArticles() {
      const map = {}
      for (const a of this.articles) {
        const d = a.date ? new Date(a.date) : null
        if (!d || isNaN(d.getTime())) continue
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const key = y + '-' + m
        if (!map[key]) map[key] = { year: y, month: parseInt(m), yearMonth: key, articles: [] }
        map[key].articles.push(a)
      }
      return Object.values(map)
        .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth))
        .map((g) => ({ ...g, monthName: g.month + '月' }))
    },
  },
  methods: {
    formatDay(date) {
      if (!date) return ''
      const d = new Date(date)
      if (isNaN(d.getTime())) return ''
      return String(d.getDate()).padStart(2, '0')
    },
  },
}
</script>
