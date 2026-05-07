import { getCollection } from '~/utils/mongodb'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const collection = await getCollection('articles')

  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 20
  const skip = (page - 1) * limit

  const filter = { status: 'published' }
  if (query.category) filter.category = query.category
  if (query.tag) filter.tags = query.tag

  const [articles, total] = await Promise.all([
    collection.find(filter).sort({ date: -1 }).skip(skip).limit(limit).toArray(),
    collection.countDocuments(filter),
  ])

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

  return {
    articles,
    categories,
    tags,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
})
