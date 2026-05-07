import { getCollection } from '~/utils/mongodb'

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  const collection = await getCollection('articles')

  const article = await collection.findOne({ slug, status: 'published' })

  if (!article) {
    throw createError({ statusCode: 404, message: '文章不存在' })
  }

  return article
})
