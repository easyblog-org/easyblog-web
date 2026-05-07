export default defineNuxtPlugin(async (nuxtApp) => {
  let articles = []
  let categories = []
  let tags = []

  if (process.server) {
    try {
      const data = await $fetch('/data/articles.json')
      articles = data.articles || []
      categories = data.categories || []
      tags = data.tags || []
    } catch (e) {
      console.warn('[article-loader] Failed to load articles:', e.message)
    }
  }

  nuxtApp.provide('articles', articles)
  nuxtApp.provide('categories', categories)
  nuxtApp.provide('tags', tags)

  if (articles.length > 0 || categories.length > 0 || tags.length > 0) {
    try {
      const { useBlogStore } = await import('~/store/blog')
      const blogStore = useBlogStore(nuxtApp.$pinia)
      blogStore.setArticles(articles)
      blogStore.setCategories(categories)
      blogStore.setTags(tags)
    } catch (e) {
      console.warn('[article-loader] Store init failed:', e.message)
    }
  }
})
