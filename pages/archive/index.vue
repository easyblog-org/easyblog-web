<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">文章归档</h1>

    <div v-if="loading" class="archive-skeleton">
      <div v-for="n in 3" :key="'sk-' + n" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="skeleton-line" style="width: 50px; height: 22px; border-radius: 4px"></div>
          <div class="skeleton-line" style="width: 40px; height: 24px; border-radius: 12px"></div>
          <div class="skeleton-line" style="width: 30px; height: 16px; border-radius: 4px"></div>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
          <div v-for="m in (n === 1 ? 2 : 5)" :key="'r-' + m" class="flex items-center justify-between px-5 py-3">
            <div class="flex items-center gap-4 min-w-0">
              <div class="skeleton-line" style="width: 20px; height: 14px; border-radius: 3px"></div>
              <div class="skeleton-line" :style="{ width: m % 2 ? '60%' : '45%', height: '14px', borderRadius: '4px' }"></div>
              <div class="skeleton-line hidden sm:block" style="width: 36px; height: 18px; border-radius: 4px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
    <div v-if="groupedArticles.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      </svg>
      <p>暂无文章</p>
    </div>
    <div v-for="(group, gIdx) in groupedArticles" :key="group.yearMonth" class="mb-8 archive-group" :style="{ animationDelay: gIdx * 0.12 + 's' }">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-lg font-bold text-primary">{{ group.year }}</span>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{{ group.monthName }}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500">{{ group.articles.length }} 篇</span>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800 archive-list" :style="{ animationDelay: gIdx * 0.12 + 0.08 + 's' }">
        <div
          v-for="(article, idx) in group.articles"
          :key="article.slug"
          class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors archive-row"
          :style="{ animationDelay: gIdx * 0.12 + 0.08 + idx * 0.04 + 's' }"
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
    </template>
    </div>
    <SimpleFooter />
  </div>
</template>

<script setup>
import SimpleFooter from '~/components/layout/SimpleFooter.vue'
import { useBlogStore } from '~/store/blog'

const blogStore = useBlogStore()
const loading = ref(true)

const articles = computed(() => blogStore.articles || [])

const groupedArticles = computed(() => {
  const map = {}
  for (const a of articles.value) {
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
})

function formatDay(date) {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return String(d.getDate()).padStart(2, '0')
}

onMounted(() => {
  if (blogStore._apiLoaded) {
    loading.value = false
  }
})

watch(() => blogStore._apiLoaded, (loaded) => {
  if (loaded) {
    loading.value = false
  }
})
</script>

<style scoped>
.skeleton-line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: archive-shimmer 1.5s ease-in-out infinite;
}

.dark .skeleton-line {
  background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 75%);
  background-size: 200% 100%;
}

@keyframes archive-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.archive-group {
  animation: archive-fade-up 0.5s ease-out both;
}

.archive-list {
  animation: archive-fade-in 0.4s ease-out both;
}

.archive-row {
  opacity: 0;
  animation: archive-row-in 0.3s ease-out both;
}

@keyframes archive-fade-up {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes archive-fade-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes archive-row-in {
  from { opacity: 0; transform: translateX(12px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
