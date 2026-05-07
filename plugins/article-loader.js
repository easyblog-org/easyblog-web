export default defineNuxtPlugin(async (nuxtApp) => {
  let articles = []
  let categories = []
  let tags = []

  if (process.server) {
    try {
      const fs = await import('fs')
      const path = await import('path')
      const fm = await import('front-matter')

      const contentDir = path.resolve(process.cwd(), 'content/articles')

      if (fs.existsSync(contentDir)) {
        function walkDir(dir) {
          const results = []
          const list = fs.readdirSync(dir)
          for (const file of list) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)
            if (stat && stat.isDirectory()) {
              results.push(...walkDir(filePath))
            } else if (file.endsWith('.md')) {
              results.push(filePath)
            }
          }
          return results
        }

        const files = walkDir(contentDir)

        for (const filePath of files) {
          try {
            const raw = fs.readFileSync(filePath, 'utf-8')
            const parsed = fm.default ? fm.default(raw) : fm(raw)
            const attrs = parsed.attributes || {}
            const status = attrs.status || (attrs.draft ? 'draft' : 'published')
            if (status !== 'published') continue
            articles.push({
              title: attrs.title || '',
              slug: attrs.slug || path.basename(filePath, '.md'),
              date: attrs.date || '',
              updated: attrs.updated || '',
              category: attrs.category || '',
              tags: attrs.tags || [],
              summary: attrs.summary || '',
              cover: attrs.cover || '',
              featured: attrs.featured || false,
              status: 'published',
              body: parsed.body || '',
            })
          } catch (e) {
            console.warn(`[article-loader] Failed to parse ${filePath}:`, e.message)
          }
        }

        articles.sort((a, b) => (a.date > b.date ? -1 : 1))

        const categoryMap = {}
        const tagMap = {}
        for (const article of articles) {
          if (article.category) {
            if (!categoryMap[article.category]) categoryMap[article.category] = 0
            categoryMap[article.category]++
          }
          if (article.tags) {
            for (const tag of article.tags) {
              if (!tagMap[tag]) tagMap[tag] = 0
              tagMap[tag]++
            }
          }
        }

        categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
        tags = Object.entries(tagMap).map(([name, count]) => ({ name, count }))

        console.log(`[article-loader] Loaded ${articles.length} articles from filesystem`)
      } else {
        console.log('[article-loader] Content dir not found, will load from JSON on client')
      }
    } catch (e) {
      console.warn('[article-loader] Filesystem load failed:', e.message)
    }
  }

  nuxtApp.provide('articles', articles)
  nuxtApp.provide('categories', categories)
  nuxtApp.provide('tags', tags)

  if ((articles.length > 0 || categories.length > 0 || tags.length > 0)) {
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

  if (process.client && articles.length === 0) {
    try {
      const data = await $fetch('/data/articles.json').catch(() => null)
      if (data?.articles) {
        const { useBlogStore } = await import('~/store/blog')
        const blogStore = useBlogStore()
        blogStore.setArticles(data.articles)
        blogStore.setCategories(data.categories || [])
        blogStore.setTags(data.tags || [])
        console.log(`[article-loader] Client fallback: loaded ${data.articles.length} articles from JSON`)
      }
    } catch (e) {
      console.warn('[article-loader] Client JSON load failed:', e.message)
    }
  }
})
