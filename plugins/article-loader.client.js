export default defineNuxtPlugin(async () => {
  try {
    const data = await $fetch('/api/articles')
    if (data?.articles) {
      const { useBlogStore } = await import('~/store/blog')
      const store = useBlogStore()
      store.setArticles(data.articles)
      store.setCategories(data.categories || [])
      store.setTags(data.tags || [])
    }
  } catch (e) {
    console.warn('[article-loader] Failed:', e.message)
  }
})
