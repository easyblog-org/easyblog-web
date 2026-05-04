export const state = () => ({
  articles: [],
  categories: [],
  tags: [],
})

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setTags(state, tags) {
    state.tags = tags
  },
}

export const getters = {
  featuredArticles: (state) => state.articles.filter((a) => a.featured),
  articlesByCategory: (state) => (category) => state.articles.filter((a) => a.category === category),
  articlesByTag: (state) => (tag) => state.articles.filter((a) => a.tags && a.tags.includes(tag)),
  articlesByYear: (state) => (year) => state.articles.filter((a) => a.date && a.date.startsWith(String(year))),
}
