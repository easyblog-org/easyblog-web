import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const possiblePaths = [
    path.resolve(process.cwd(), 'public', 'data', 'articles.json'),
    path.resolve(process.cwd(), '..', 'public', 'data', 'articles.json'),
    path.resolve('/var/task', 'public', 'data', 'articles.json'),
  ]

  let dataPath = null
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      dataPath = p
      break
    }
  }

  if (!dataPath) {
    console.error('[api/articles] articles.json not found')
    return { articles: [], categories: [], tags: [] }
  }

  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(raw)
    console.log(`[api/articles] Loaded ${data.articles?.length || 0} articles`)
    return data
  } catch (e) {
    console.error('[api/articles] Error reading file:', e.message)
    return { articles: [], categories: [], tags: [] }
  }
})
