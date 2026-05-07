export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const data = await $fetch('/data/articles.json')
    if (data?.articles) {
      const { useBlogStore } = await import('~/store/blog')
      const blogStore = useBlogStore()
      blogStore.setArticles(data.articles)
      blogStore.setCategories(data.categories || [])
      blogStore.setTags(data.tags || [])
      console.log(`[article-loader] Loaded ${data.articles.length} articles`)
    }
  } catch (e) {
    console.warn('[article-loader] Failed:', e.message)
  }
})
