import { useBlogStore } from '~/store/blog'

export default defineNuxtPlugin(() => {
  const store = useBlogStore()

  const hydrated = store.hydrateFromCache()

  if (hydrated && !store.isCacheExpired()) {
    store._apiLoaded = true
    return
  }

  if (!hydrated) {
    const cached = loadExpiredCache()
    if (cached) {
      store.articles = cached.articles || []
      store.categories = cached.categories || []
      store.tags = cached.tags || []
    }
  }

  $fetch('/api/articles')
    .then((data) => {
      if (data?.articles) {
        store.setArticles(data.articles)
        store.setCategories(data.categories || [])
        store.setTags(data.tags || [])
      }
      store._apiLoaded = true
    })
    .catch((e) => {
      console.error('[article-loader] Failed:', e.message)
      store._apiLoaded = true
    })
})

function loadExpiredCache() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('easyblog_cache')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
