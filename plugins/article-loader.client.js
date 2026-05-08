export default defineNuxtPlugin(async () => {
  console.log('[article-loader] Plugin starting...')
  try {
    const data = await $fetch('/api/articles')
    console.log('[article-loader] API response:', data ? `✅ ${data.articles?.length || 0} articles` : '❌ null')

    if (data?.articles) {
      const { useBlogStore } = await import('~/store/blog')
      const store = useBlogStore()
      store.setArticles(data.articles)
      store.setCategories(data.categories || [])
      store.setTags(data.tags || [])
      console.log('[article-loader] Store updated ✅')
      console.log('[article-loader] Articles:', data.articles.length)
      console.log('[article-loader] Categories:', (data.categories || []).length)
      console.log('[article-loader] Tags:', (data.tags || []).length)
    } else {
      console.warn('[article-loader] No articles in response')
    }
  } catch (e) {
    console.error('[article-loader] Failed:', e.message)
    console.error('[article-loader] Stack:', e.stack?.slice(0, 300))
  }
})
