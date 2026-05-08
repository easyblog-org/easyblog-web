import { getCollection } from '~/utils/mongodb'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  console.log('[MongoDB API] /api/articles called')
  console.log('[MongoDB API] mongoUri:', config.mongoUri ? '✅ configured' : '❌ missing')
  console.log('[MongoDB API] mongoDbName:', config.mongoDbName)
  console.log('[MongoDB API] mongoCollection:', config.mongoCollectionName)

  try {
    const query = getQuery(event)
    console.log('[MongoDB API] Query params:', JSON.stringify(query))

    const collection = await getCollection()
    console.log('[MongoDB API] Collection obtained ✅')

    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const skip = (page - 1) * limit

    const filter = { status: 'published' }
    if (query.category) filter.category = query.category
    if (query.tag) filter.tags = query.tag

    console.log('[MongoDB API] Finding articles with filter:', JSON.stringify(filter))

    const [articles, total] = await Promise.all([
      collection.find(filter).sort({ date: -1 }).skip(skip).limit(limit).toArray(),
      collection.countDocuments(filter),
    ])

    console.log(`[MongoDB API] Found ${articles.length} articles (total: ${total})`)

    const [categories, tags] = await Promise.all([
      collection.aggregate([
        { $match: { status: 'published', category: { $ne: '', $exists: true } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { name: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } },
      ]).toArray(),
      collection.aggregate([
        { $unwind: '$tags' },
        { $match: { status: 'published' } },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $project: { name: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } },
      ]).toArray(),
    ])

    console.log(`[MongoDB API] Categories: ${categories.length}, Tags: ${tags.length}`)

    return {
      articles,
      categories,
      tags,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }
  } catch (e) {
    console.error('[MongoDB API] ERROR:', e.message)
    console.error('[MongoDB API] Stack:', e.stack?.slice(0, 500))
    throw createError({ statusCode: 500, message: '数据库查询失败: ' + e.message })
  }
})
