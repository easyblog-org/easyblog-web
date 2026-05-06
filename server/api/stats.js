import { get, mget, incr, set, exists } from '../../utils/redis.js'

const VIEW_COOLDOWN = parseInt(process.env.STATS_VIEW_COOLDOWN || '3600', 10)
const LIKE_EXPIRE = parseInt(process.env.STATS_LIKE_EXPIRE || '2592000', 10)
const DEBUG = process.env.ENABLE_REDIS_DEBUG === 'true'

function log(...args) {
  if (DEBUG) console.log('[Stats]', ...args)
}

function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
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

export default async function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const url = new URL(req.url, `http://${req.headers.host}`)
  const action = url.pathname.replace(/^\//, '') || ''
  log(`[${req.method}] /api/stats/${action}`, url.search)
  if (req.method !== 'GET' && req.method !== 'POST') {
    log('✗ Method not allowed:', req.method)
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  }
  try {
    if (!action) {
      log('✗ Missing action')
      return res.end(JSON.stringify({ error: 'Missing action' }))
    }
    switch (action) {
      case 'batch':
        await handleBatch(url, res)
        break
      case 'view':
        await handleView(req, url, res)
        break
      case 'like':
        await handleLike(req, url, res)
        break
      case 'liked':
        await handleLiked(req, url, res)
        break
      default:
        log('✗ Unknown action:', action)
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Unknown action' }))
    }
  } catch (e) {
    log('✗ Error:', e.message)
    console.error('[Stats API] Error:', e.message)
    res.statusCode = 500
    res.end(JSON.stringify({ error: e.message }))
  }
}

async function handleBatch(url, res) {
  const slugsParam = url.searchParams.get('slugs')
  if (!slugsParam) {
    log('[batch] No slugs param')
    return res.end(JSON.stringify({ viewsMap: {}, likesMap: {} }))
  }
  const slugs = slugsParam.split(',').filter(Boolean)
  if (!slugs.length) {
    log('[batch] Empty slugs after filter')
    return res.end(JSON.stringify({ viewsMap: {}, likesMap: {} }))
  }
  log('[batch] Querying', slugs.length, 'articles:', slugs.join(', '))
  const viewKeys = slugs.map((s) => `views:${s}`)
  const likeKeys = slugs.map((s) => `likes:${s}`)
  const [viewResults, likeResults] = await Promise.all([mget(viewKeys), mget(likeKeys)])
  const viewsMap = {}
  const likesMap = {}
  slugs.forEach((slug, i) => {
    viewsMap[slug] = parseInt(viewResults[i], 10) || 0
    likesMap[slug] = parseInt(likeResults[i], 10) || 0
  })
  log('[batch] Result → views:', JSON.stringify(viewsMap).slice(0, 200), '| likes:', JSON.stringify(likesMap).slice(0, 200))
  res.end(JSON.stringify({ viewsMap, likesMap }))
}

async function handleView(req, url, res) {
  const slug = url.searchParams.get('slug')
  if (!slug) {
    log('[view] No slug param')
    return res.end(JSON.stringify({ count: 0 }))
  }
  const key = `views:${slug}`
  const ip = getClientIP(req)
  const hashedIP = ipHash(ip)
  const cooldownKey = `vcd:${hashedIP}:${slug}`
  log('[view] slug=', slug, '| IP=', ip, '| hashed=', hashedIP)
  const alreadyCounted = await exists(cooldownKey)
  log('[view] cooldown exists?', alreadyCounted, `| key=${cooldownKey} | TTL=${VIEW_COOLDOWN}s`)
  if (!alreadyCounted) {
    await set(cooldownKey, '1', VIEW_COOLDOWN)
    await incr(key)
    log('[view] ✓ Counted! set cooldown & incr')
  } else {
    log('[view] ⊘ Skipped (within cooldown)')
  }
  const count = await get(key)
  log('[view] → count=', count)
  res.end(JSON.stringify({ count: parseInt(count, 10) || 0 }))
}

async function handleLike(req, url, res) {
  if (req.method !== 'POST') {
    log('[like] ✗ Method not allowed:', req.method)
    res.statusCode = 405
    return res.end(JSON.stringify({ error: 'POST required' }))
  }
  const slug = url.searchParams.get('slug')
  if (!slug) {
    log('[like] No slug param')
    return res.end(JSON.stringify({ count: 0, liked: false }))
  }
  const key = `likes:${slug}`
  const ip = getClientIP(req)
  const hashedIP = ipHash(ip)
  const likedKey = `liked:${hashedIP}:${slug}`
  log('[like] slug=', slug, '| IP=', ip, '| hashed=', hashedIP)
  const alreadyLiked = await exists(likedKey)
  log('[like] alreadyLiked?', alreadyLiked, `| key=${likedKey} | TTL=${LIKE_EXPIRE}s`)
  if (alreadyLiked) {
    const count = await get(key)
    log('[like] ⊘ Already liked, count=', count)
    return res.end(JSON.stringify({ count: parseInt(count, 10) || 0, liked: true }))
  }
  await set(likedKey, '1', LIKE_EXPIRE)
  const newCount = await incr(key)
  log('[like] ✓ Liked! newCount=', newCount)
  res.end(JSON.stringify({ count: newCount, liked: true }))
}

async function handleLiked(req, url, res) {
  const slug = url.searchParams.get('slug')
  if (!slug) {
    return res.end(JSON.stringify({ liked: false }))
  }
  const ip = getClientIP(req)
  const hashedIP = ipHash(ip)
  const likedKey = `liked:${hashedIP}:${slug}`
  const alreadyLiked = await exists(likedKey)
  log('[liked] slug=', slug, '| IP=', ip, '| hashed=', hashedIP, '| liked=', alreadyLiked)
  res.end(JSON.stringify({ liked: alreadyLiked }))
}
