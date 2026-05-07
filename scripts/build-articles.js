import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

const contentDir = path.resolve(process.cwd(), 'content/articles')
const outputDir = path.resolve(process.cwd(), 'public', 'data')
const outputFile = path.join(outputDir, 'articles.json')

if (!fs.existsSync(contentDir)) {
  console.error('[build-articles] Content directory not found:', contentDir)
  process.exit(1)
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

const articles = []
const files = walkDir(contentDir)

for (const filePath of files) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = fm(raw)
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
    console.warn(`[build-articles] Failed to parse ${filePath}:`, e.message)
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

const categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
const tags = Object.entries(tagMap).map(([name, count]) => ({ name, count }))

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify({ articles, categories, tags }, null, 2))

console.log(`[build-articles] Generated ${articles.length} articles to ${outputFile}`)
