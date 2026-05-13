import { defineStore } from 'pinia'

const CACHE_KEY = 'easyblog_cache'
const CACHE_TTL = 5 * 60 * 1000

function loadFromStorage() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (Date.now() - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function saveToStorage(articles, categories, tags) {
  if (typeof window === 'undefined') return
  try {
    const data = {
      articles,
      categories,
      tags,
      timestamp: Date.now(),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // storage full or unavailable
  }
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [],
    categories: [],
    tags: [],
    _hydrated: false,
    _apiLoaded: false,
  }),
  actions: {
    setArticles(articles) {
      this.articles = articles
      this._persist()
    },
    setCategories(categories) {
      this.categories = categories
      this._persist()
    },
    setTags(tags) {
      this.tags = tags
      this._persist()
    },
    hydrateFromCache() {
      if (this._hydrated) return false
      const cached = loadFromStorage()
      if (!cached) return false
      this.articles = cached.articles || []
      this.categories = cached.categories || []
      this.tags = cached.tags || []
      this._hydrated = true
      return true
    },
    isCacheExpired() {
      if (typeof window === 'undefined') return true
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return true
        const data = JSON.parse(raw)
        return Date.now() - data.timestamp > CACHE_TTL
      } catch {
        return true
      }
    },
    _persist() {
      saveToStorage(this.articles, this.categories, this.tags)
    },
  },
  getters: {
    featuredArticles: (state) => state.articles.filter((a) => a.featured),
    articlesByCategory: (state) => (category) => state.articles.filter((a) => a.category === category),
    articlesByTag: (state) => (tag) => state.articles.filter((a) => a.tags && a.tags.includes(tag)),
    articlesByYear: (state) => (year) => state.articles.filter((a) => a.date && a.date.startsWith(String(year))),
  },
})
