const BASE_URL = process.env.REDIS_URL || ''
const TOKEN = process.env.REDIS_TOKEN || ''
const DEBUG = process.env.ENABLE_REDIS_DEBUG === 'true'
const MAX_RETRIES = 3
const FETCH_TIMEOUT = 5000

function log(...args) {
  if (DEBUG) console.log('[Redis]', ...args)
}

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  }
}

async function execWithRetry(command, ...args) {
  if (!BASE_URL || !TOKEN) throw new Error('Redis not configured')

  let lastError = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const body = [command, ...args.map(String)]
      log(`→ [${attempt}/${MAX_RETRIES}]`, command, args.slice(0, 3).join(', '), args.length > 3 ? `...(${args.length}args)` : '')

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        log('✗', command, `HTTP ${res.status}:`, text.slice(0, 100))
        lastError = new Error(`Redis error ${res.status}`)
        continue
      }

      const json = await res.json()
      log('←', command, `OK result=`, JSON.stringify(json.result).slice(0, 100))
      return json

    } catch (e) {
      lastError = e
      const isTimeout = e.name === 'AbortError'
      const isNetwork = e.message.includes('fetch failed') || e.message.includes('network')

      if (isNetwork && attempt < MAX_RETRIES) {
        log(`⚠️ [${attempt}/${MAX_RETRIES}] ${command} 网络错误，${500 * attempt}ms 后重试...`)
        await new Promise(r => setTimeout(r, 500 * attempt))
        continue
      }

      if (isTimeout && attempt < MAX_RETRIES) {
        log(`⚠️ [${attempt}/${MAX_RETRIES}] ${command} 超时，${500 * attempt}ms 后重试...`)
        await new Promise(r => setTimeout(r, 500 * attempt))
        continue
      }

      log(`✗ [${attempt}/${MAX_RETRIES}] ${command} failed:`, e.message)
    }
  }

  throw lastError || new Error(`${command} failed after ${MAX_RETRIES} retries`)
}

export async function get(key) {
  try {
    const result = await execWithRetry('GET', key)
    return result.result
  } catch (e) {
    console.warn('[Redis] GET error:', e.message)
    return null
  }
}

export async function set(key, value, exSeconds) {
  try {
    let result
    if (exSeconds) {
      result = await execWithRetry('SETEX', key, String(exSeconds), String(value))
    } else {
      result = await execWithRetry('SET', key, String(value))
    }
    return result.result === 'OK'
  } catch (e) {
    console.warn('[Redis] SET error:', e.message)
    return false
  }
}

export async function incr(key) {
  try {
    const result = await execWithRetry('INCR', key)
    return typeof result.result === 'number' ? result.result : parseInt(result.result, 10) || 0
  } catch (e) {
    console.warn('[Redis] INCR error:', e.message)
    return 0
  }
}

export async function mget(keys) {
  if (!keys || !keys.length) return []

  log('→ MGET', `${keys.length} keys:`, keys.slice(0, 3).join(', '), keys.length > 3 ? '...' : '')

  try {
    const results = await Promise.all(
      keys.map(key => get(key))
    )
    log('← MGET (parallel GET) OK')
    return results
  } catch (e) {
    console.warn('[Redis] MGET error:', e.message)
    return keys.map(() => null)
  }
}

export async function exists(key) {
  try {
    const result = await execWithRetry('EXISTS', key)
    return result.result > 0
  } catch (e) {
    console.warn('[Redis] EXISTS error:', e.message)
    return false
  }
}

export async function del(key) {
  try {
    const result = await execWithRetry('DEL', key)
    return result.result > 0
  } catch (e) {
    console.warn('[Redis] DEL error:', e.message)
    return false
  }
}
