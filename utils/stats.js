const ENABLED = process.env.ENABLE_REDIS_STATS === 'true'
const API_BASE = '/api/stats'

function lsGet(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const val = localStorage.getItem(key)
    return val !== null ? parseInt(val, 10) : fallback
  } catch {
    return fallback
  }
}

function lsSet(key, value) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, String(value))
  } catch { }
}

async function apiFetch(path, options) {
  const res = await fetch(`${API_BASE}${path}`, options)
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export function isRedisEnabled() {
  return ENABLED
}

export async function getBatchStats(slugs) {
  if (!slugs || !slugs.length) return { viewsMap: {}, likesMap: {} }
  if (ENABLED) {
    try {
      return await apiFetch(`/batch?slugs=${slugs.join(',')}`)
    } catch (e) {
      console.warn('[Stats] batch API failed:', e.message)
    }
  }
  const viewsMap = {}
  const likesMap = {}
  slugs.forEach((slug) => {
    viewsMap[slug] = lsGet(`views:${slug}`, Math.floor(Math.random() * 9000 + 1000))
    likesMap[slug] = lsGet(`likes:${slug}`, Math.floor(Math.random() * 50 + 5))
    if (!localStorage.getItem(`views:${slug}:init`)) {
      lsSet(`views:${slug}`, viewsMap[slug])
      lsSet(`views:${slug}:init`, '1')
      lsSet(`likes:${slug}`, likesMap[slug])
      lsSet(`likes:${slug}:init`, '1')
    }
  })
  return { viewsMap, likesMap }
}

export async function getViewCount(slug) {
  if (ENABLED) {
    try {
      const data = await apiFetch(`/view?slug=${encodeURIComponent(slug)}`)
      return data.count || 0
    } catch (e) {
      console.warn('[Stats] view API failed:', e.message)
    }
  }
  const key = `views:${slug}`
  let count = lsGet(key, 0)
  if (count === 0) {
    count = Math.floor(Math.random() * 9000 + 1000)
    lsSet(key, count)
    lsSet(`${key}:init`, '1')
  }
  const viewedKey = `${key}:viewed`
  if (lsGet(viewedKey, 0) !== 1) {
    count++
    lsSet(key, count)
    lsSet(viewedKey, '1')
  }
  return count
}

export async function getLikeCount(slug) {
  if (ENABLED) {
    try {
      const data = await apiFetch(`/batch?slugs=${encodeURIComponent(slug)}`)
      return (data.likesMap && data.likesMap[slug]) || 0
    } catch (e) {
      console.warn('[Stats] like count API failed:', e.message)
    }
  }
  const key = `likes:${slug}`
  let count = lsGet(key, 0)
  if (count === 0) {
    count = Math.floor(Math.random() * 50 + 5)
    lsSet(key, count)
    lsSet(`${key}:init`, '1')
  }
  return count
}

export async function getArticleStats(slug) {
  if (ENABLED) {
    try {
      const data = await apiFetch(`/batch?slugs=${encodeURIComponent(slug)}`)
      return {
        views: (data.viewsMap && data.viewsMap[slug]) || 0,
        likes: (data.likesMap && data.likesMap[slug]) || 0,
      }
    } catch (e) {
      console.warn('[Stats] article stats API failed:', e.message)
    }
  }
  const viewsKey = `views:${slug}`
  const likesKey = `likes:${slug}`
  let views = lsGet(viewsKey, 0)
  let likes = lsGet(likesKey, 0)
  if (views === 0) {
    views = Math.floor(Math.random() * 9000 + 1000)
    lsSet(viewsKey, views)
    lsSet(`${viewsKey}:init`, '1')
  }
  if (likes === 0) {
    likes = Math.floor(Math.random() * 50 + 5)
    lsSet(likesKey, likes)
    lsSet(`${likesKey}:init`, '1')
  }
  return { views, likes }
}

export async function toggleLike(slug) {
  if (ENABLED) {
    try {
      const data = await apiFetch(`/like?slug=${encodeURIComponent(slug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      return { count: data.count || 0, liked: data.liked || false }
    } catch (e) {
      console.warn('[Stats] like API failed:', e.message)
    }
  }
  const key = `likes:${slug}`
  const likedKey = `${key}:_liked`
  const isLiked = localStorage.getItem(likedKey) === '1'
  let count = lsGet(key, 0)
  if (count === 0) {
    count = Math.floor(Math.random() * 50 + 5)
    lsSet(key, count)
    lsSet(`${key}:init`, '1')
  }
  if (isLiked) {
    count = Math.max(0, count - 1)
    lsSet(key, count)
    localStorage.removeItem(likedKey)
    return { count, liked: false }
  }
  count++
  lsSet(key, count)
  lsSet(likedKey, '1')
  return { count, liked: true }
}

export async function getLikedStatus(slug) {
  if (ENABLED) {
    try {
      const data = await apiFetch(`/liked?slug=${encodeURIComponent(slug)}`)
      return data.liked || false
    } catch (e) {
      console.warn('[Stats] liked status API failed:', e.message)
      return false
    }
  }
  const key = `likes:${slug}:_liked`
  if (typeof window === 'undefined') return false
  return localStorage.getItem(key) === '1'
}
