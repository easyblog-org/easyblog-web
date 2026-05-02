import fm from 'front-matter'
import fs from 'fs'
import path from 'path'

export default function (context, inject) {
  const contentDir = path.resolve(process.cwd(), 'content/articles')
  let articles = []

  try {
    if (!fs.existsSync(contentDir)) {
      console.warn('[article-loader] content/articles/ directory not found, using empty articles array')
      inject('articles', [])
      context.store.commit('setArticles', [])
      context.store.commit('setCategories', [])
      context.store.commit('setTags', [])
      return
    }

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
        const parsed = fm(raw)
        const attrs = parsed.attributes || {}
        if (attrs.draft) continue
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
          body: parsed.body || '',
        })
      } catch (e) {
        console.warn(`[article-loader] Failed to parse ${filePath}:`, e.message)
      }
    }

    articles.sort((a, b) => (a.date > b.date ? -1 : 1))

    const categories = []
    const categoryMap = {}
    for (const article of articles) {
      if (article.category) {
        if (!categoryMap[article.category]) {
          categoryMap[article.category] = 0
          categories.push(article.category)
        }
        categoryMap[article.category]++
      }
    }

    const tags = []
    const tagMap = {}
    for (const article of articles) {
      if (article.tags) {
        for (const tag of article.tags) {
          if (!tagMap[tag]) {
            tagMap[tag] = 0
            tags.push(tag)
          }
          tagMap[tag]++
        }
      }
    }

    const categoryList = categories.map((name) => ({ name, count: categoryMap[name] }))
    const tagList = tags.map((name) => ({ name, count: tagMap[name] }))

    inject('articles', articles)
    context.store.commit('setArticles', articles)
    context.store.commit('setCategories', categoryList)
    context.store.commit('setTags', tagList)
  } catch (e) {
    console.error('[article-loader] Error loading articles:', e.message)
    inject('articles', [])
    context.store.commit('setArticles', [])
    context.store.commit('setCategories', [])
    context.store.commit('setTags', [])
  }
}
