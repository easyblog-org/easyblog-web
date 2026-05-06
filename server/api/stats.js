import { get, mget, incr, set, exists } from '../../utils/redis.js'

function getClientIP(event) {
  const headers = getRequestHeaders(event)
  return (
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['x-real-ip'] ||
    'unknown'
  )
}

function ipHash(ip) {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

async function handleBatch(query, config) {
  const slugsParam = query.slugs
  if (!slugsParam) {
    return { viewsMap: {}, likesMap: {} }
  }
  const slugs = slugsParam.split(',').filter(Boolean)
  if (!slugs.length) {
    return { viewsMap: {}, likesMap: {} }
  }
  const viewKeys = slugs.map((s) => `views:${s}`)
  const likeKeys = slugs.map((s) => `likes:${s}`)
  const [viewResults, likeResults] = await Promise.all([mget(viewKeys), mget(likeKeys)])
  const viewsMap = {}
  const likesMap = {}
  slugs.forEach((slug, i) => {
    viewsMap[slug] = parseInt(viewResults[i], 10) || 0
    likesMap[slug] = parseInt(likeResults[i], 10) || 0
  })
  return { viewsMap, likesMap }
}

async function handleView(event, query, config) {
  const slug = query.slug
  if (!slug) {
    return { count: 0 }
  }
  const key = `views:${slug}`
  const ip = getClientIP(event)
  const hashedIP = ipHash(ip)
  const cooldownKey = `vcd:${hashedIP}:${slug}`
  const VIEW_COOLDOWN = config.statsViewCooldown || 3600
  const alreadyCounted = await exists(cooldownKey)
  if (!alreadyCounted) {
    await set(cooldownKey, '1', VIEW_COOLDOWN)
    await incr(key)
  }
  const count = await get(key)
  return { count: parseInt(count, 10) || 0 }
}

async function handleLike(event, query, config) {
  const slug = query.slug
  if (!slug) {
    return { count: 0, liked: false }
  }
  const key = `likes:${slug}`
  const ip = getClientIP(event)
  const hashedIP = ipHash(ip)
  const likedKey = `liked:${hashedIP}:${slug}`
  const LIKE_EXPIRE = config.statsLikeExpire || 3600
  const alreadyLiked = await exists(likedKey)
  if (alreadyLiked) {
    const count = await get(key)
    return { count: parseInt(count, 10) || 0, liked: true }
  }
  await set(likedKey, '1', LIKE_EXPIRE)
  const newCount = await incr(key)
  return { count: newCount, liked: true }
}

async function handleLiked(event, query) {
  const slug = query.slug
  if (!slug) {
    return { liked: false }
  }
  const ip = getClientIP(event)
  const hashedIP = ipHash(ip)
  const likedKey = `liked:${hashedIP}:${slug}`
  const alreadyLiked = await exists(likedKey)
  return { liked: alreadyLiked }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const DEBUG = config.enableRedisDebug || false

  const method = getMethod(event)
  const query = getQuery(event)

  function log(...args) {
    if (DEBUG) console.log('[Stats]', ...args)
  }

  log(`[${method}] /api/stats`, JSON.stringify(query).slice(0, 100))

  try {
    const action = query.action || ''

    if (!action) {
      log('Missing action')
      throw createError({ statusCode: 400, message: 'Missing action' })
    }

    let result
    switch (action) {
      case 'batch':
        result = await handleBatch(query, config)
        break
      case 'view':
        result = await handleView(event, query, config)
        break
      case 'like':
        result = await handleLike(event, query, config)
        break
      case 'liked':
        result = await handleLiked(event, query)
        break
      default:
        log('Unknown action:', action)
        throw createError({ statusCode: 404, message: 'Unknown action' })
    }

    log('Result:', JSON.stringify(result).slice(0, 200))
    return result
  } catch (e) {
    log('Error:', e.message)
    console.error('[Stats API] Error:', e.message)
    throw e
  }
})
