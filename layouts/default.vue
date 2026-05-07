<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <TheHeader />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import TheHeader from '~/components/layout/TheHeader.vue'
import { useBlogStore } from '~/store/blog'

const blogStore = useBlogStore()

if (process.client && (!blogStore.articles || blogStore.articles.length === 0)) {
  const { data } = await useAsyncData('articles', () => $fetch('/data/articles.json').catch(() => null))
  if (data.value?.articles) {
    blogStore.setArticles(data.value.articles)
    blogStore.setCategories(data.value.categories || [])
    blogStore.setTags(data.value.tags || [])
  }
}
</script>
