import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [],
    categories: [],
    tags: [],
  }),
  actions: {
    setArticles(articles) {
      this.articles = articles
    },
    setCategories(categories) {
      this.categories = categories
    },
    setTags(tags) {
      this.tags = tags
    },
  },
  getters: {
    featuredArticles: (state) => state.articles.filter((a) => a.featured),
    articlesByCategory: (state) => (category) => state.articles.filter((a) => a.category === category),
    articlesByTag: (state) => (tag) => state.articles.filter((a) => a.tags && a.tags.includes(tag)),
    articlesByYear: (state) => (year) => state.articles.filter((a) => a.date && a.date.startsWith(String(year))),
  },
})
