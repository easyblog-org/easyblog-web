export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  return {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    config: {
      mongoUri: config.mongoUri ? '✅ configured' : '❌ missing',
      mongoDbName: config.mongoDbName,
      mongoCollection: config.mongoCollectionName,
      redisUrl: config.redisUrl ? '✅ configured' : '❌ missing',
      enableRedisStats: config.enableRedisStats,
    },
    test: {
      mongodb: await testMongoDB(),
      redis: await testRedis(),
    }
  }
})

async function testMongoDB() {
  try {
    const { getCollection } = await import('~/utils/mongodb')
    const collection = await getCollection()
    const count = await collection.countDocuments({ status: 'published' })
    return { status: '✅ connected', articleCount: count }
  } catch (e) {
    return { status: '❌ error', message: e.message }
  }
}

async function testRedis() {
  try {
    if (!process.env.REDIS_URL) return { status: '⚠️ not configured' }
    const { get } = await import('~/utils/redis.js')
    const testKey = '_health_check_' + Date.now()
    await set(testKey, 'ok', 10)
    const val = await get(testKey)
    return { status: '✅ connected', testValue: val }
  } catch (e) {
    return { status: '❌ error', message: e.message }
  }
}

async function set(key, value, exSeconds) {
  try {
    const { exec } = await import('~/utils/redis.js')
    let result
    if (exSeconds) {
      result = await exec('SETEX', key, String(exSeconds), String(value))
    } else {
      result = await exec('SET', key, String(value))
    }
    return result.result === 'OK'
  } catch (e) {
    return false
  }
}
