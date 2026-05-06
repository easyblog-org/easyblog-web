const BASE_URL = process.env.REDIS_URL || ''
const TOKEN = process.env.REDIS_TOKEN || ''
const DEBUG = process.env.ENABLE_REDIS_DEBUG === 'true'

function log(...args) {
  if (DEBUG) console.log('[Redis]', ...args)
}

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  }
}

async function exec(command, ...args) {
  if (!BASE_URL || !TOKEN) throw new Error('Redis not configured')
  const body = [command, ...args.map(String)]
  log('→', command, args.slice(0, 3).join(', '), args.length > 3 ? `...(${args.length}args)` : '')
  log('  body:', JSON.stringify(body))
  const startTime = Date.now()
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })
  const elapsed = Date.now() - startTime
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    log('✗', command, `failed ${res.status} (${elapsed}ms):`, text.slice(0, 200))
    throw new Error(`Redis error ${res.status}: ${text}`)
  }
  const json = await res.json()
  log('←', command, `OK (${elapsed}ms) result=`, JSON.stringify(json.result).slice(0, 100))
  return json
}

export async function get(key) {
  try {
    const result = await exec('GET', key)
    return result.result
  } catch (e) {
    console.error('[Redis] GET error:', e.message)
    return null
  }
}

export async function set(key, value, exSeconds) {
  try {
    let result
    if (exSeconds) {
      result = await exec('SETEX', key, String(exSeconds), String(value))
    } else {
      result = await exec('SET', key, String(value))
    }
    return result.result === 'OK'
  } catch (e) {
    console.error('[Redis] SET error:', e.message)
    return false
  }
}

export async function incr(key) {
  try {
    const result = await exec('INCR', key)
    return typeof result.result === 'number' ? result.result : parseInt(result.result, 10) || 0
  } catch (e) {
    console.error('[Redis] INCR error:', e.message)
    return 0
  }
}

export async function mget(keys) {
  if (!keys || !keys.length) return []
  try {
    log('→ MGET', `${keys.length} keys:`, keys.slice(0, 3).join(', '), keys.length > 3 ? '...' : '')
    const result = await exec('MGET', ...keys)
    return Array.isArray(result.result) ? result.result : []
  } catch (e) {
    console.error('[Redis] MGET error:', e.message)
    return keys.map(() => null)
  }
}

export async function exists(key) {
  try {
    const result = await exec('EXISTS', key)
    return result.result > 0
  } catch (e) {
    console.error('[Redis] EXISTS error:', e.message)
    return false
  }
}

export async function del(key) {
  try {
    const result = await exec('DEL', key)
    return result.result > 0
  } catch (e) {
    console.error('[Redis] DEL error:', e.message)
    return false
  }
}
