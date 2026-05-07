import { d as defineEventHandler, g as getMethod, a as getQuery, c as createError, u as useRuntimeConfig, b as getRequestHeaders } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const BASE_URL = process.env.REDIS_URL || "";
const TOKEN = process.env.REDIS_TOKEN || "";
const DEBUG = process.env.ENABLE_REDIS_DEBUG === "true";
function log(...args) {
  if (DEBUG) console.log("[Redis]", ...args);
}
function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`
  };
}
async function exec(command, ...args) {
  if (!BASE_URL || !TOKEN) throw new Error("Redis not configured");
  const body = [command, ...args.map(String)];
  log("\u2192", command, args.slice(0, 3).join(", "), args.length > 3 ? `...(${args.length}args)` : "");
  log("  body:", JSON.stringify(body));
  const startTime = Date.now();
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  });
  const elapsed = Date.now() - startTime;
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    log("\u2717", command, `failed ${res.status} (${elapsed}ms):`, text.slice(0, 200));
    throw new Error(`Redis error ${res.status}: ${text}`);
  }
  const json = await res.json();
  log("\u2190", command, `OK (${elapsed}ms) result=`, JSON.stringify(json.result).slice(0, 100));
  return json;
}
async function get(key) {
  try {
    const result = await exec("GET", key);
    return result.result;
  } catch (e) {
    console.error("[Redis] GET error:", e.message);
    return null;
  }
}
async function set(key, value, exSeconds) {
  try {
    let result;
    if (exSeconds) {
      result = await exec("SETEX", key, String(exSeconds), String(value));
    } else {
      result = await exec("SET", key, String(value));
    }
    return result.result === "OK";
  } catch (e) {
    console.error("[Redis] SET error:", e.message);
    return false;
  }
}
async function incr(key) {
  try {
    const result = await exec("INCR", key);
    return typeof result.result === "number" ? result.result : parseInt(result.result, 10) || 0;
  } catch (e) {
    console.error("[Redis] INCR error:", e.message);
    return 0;
  }
}
async function mget(keys) {
  if (!keys || !keys.length) return [];
  try {
    log("\u2192 MGET", `${keys.length} keys:`, keys.slice(0, 3).join(", "), keys.length > 3 ? "..." : "");
    const result = await exec("MGET", ...keys);
    return Array.isArray(result.result) ? result.result : [];
  } catch (e) {
    console.error("[Redis] MGET error:", e.message);
    return keys.map(() => null);
  }
}
async function exists(key) {
  try {
    const result = await exec("EXISTS", key);
    return result.result > 0;
  } catch (e) {
    console.error("[Redis] EXISTS error:", e.message);
    return false;
  }
}

function getClientIP(event) {
  var _a, _b;
  const headers = getRequestHeaders(event);
  return ((_b = (_a = headers["x-forwarded-for"]) == null ? void 0 : _a.split(",")[0]) == null ? void 0 : _b.trim()) || headers["x-real-ip"] || "unknown";
}
function ipHash(ip) {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
async function handleBatch(query, config) {
  const slugsParam = query.slugs;
  if (!slugsParam) {
    return { viewsMap: {}, likesMap: {} };
  }
  const slugs = slugsParam.split(",").filter(Boolean);
  if (!slugs.length) {
    return { viewsMap: {}, likesMap: {} };
  }
  const viewKeys = slugs.map((s) => `views:${s}`);
  const likeKeys = slugs.map((s) => `likes:${s}`);
  const [viewResults, likeResults] = await Promise.all([mget(viewKeys), mget(likeKeys)]);
  const viewsMap = {};
  const likesMap = {};
  slugs.forEach((slug, i) => {
    viewsMap[slug] = parseInt(viewResults[i], 10) || 0;
    likesMap[slug] = parseInt(likeResults[i], 10) || 0;
  });
  return { viewsMap, likesMap };
}
async function handleView(event, query, config) {
  const slug = query.slug;
  if (!slug) {
    return { count: 0 };
  }
  const key = `views:${slug}`;
  const ip = getClientIP(event);
  const hashedIP = ipHash(ip);
  const cooldownKey = `vcd:${hashedIP}:${slug}`;
  const VIEW_COOLDOWN = config.statsViewCooldown || 3600;
  const alreadyCounted = await exists(cooldownKey);
  if (!alreadyCounted) {
    await set(cooldownKey, "1", VIEW_COOLDOWN);
    await incr(key);
  }
  const count = await get(key);
  return { count: parseInt(count, 10) || 0 };
}
async function handleLike(event, query, config) {
  const slug = query.slug;
  if (!slug) {
    return { count: 0, liked: false };
  }
  const key = `likes:${slug}`;
  const ip = getClientIP(event);
  const hashedIP = ipHash(ip);
  const likedKey = `liked:${hashedIP}:${slug}`;
  const LIKE_EXPIRE = config.statsLikeExpire || 3600;
  const alreadyLiked = await exists(likedKey);
  if (alreadyLiked) {
    const count = await get(key);
    return { count: parseInt(count, 10) || 0, liked: true };
  }
  await set(likedKey, "1", LIKE_EXPIRE);
  const newCount = await incr(key);
  return { count: newCount, liked: true };
}
async function handleLiked(event, query) {
  const slug = query.slug;
  if (!slug) {
    return { liked: false };
  }
  const ip = getClientIP(event);
  const hashedIP = ipHash(ip);
  const likedKey = `liked:${hashedIP}:${slug}`;
  const alreadyLiked = await exists(likedKey);
  return { liked: alreadyLiked };
}
const stats = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const DEBUG = config.enableRedisDebug || false;
  const method = getMethod(event);
  const query = getQuery(event);
  function log(...args) {
    if (DEBUG) console.log("[Stats]", ...args);
  }
  log(`[${method}] /api/stats`, JSON.stringify(query).slice(0, 100));
  try {
    const action = query.action || "";
    if (!action) {
      log("Missing action");
      throw createError({ statusCode: 400, message: "Missing action" });
    }
    let result;
    switch (action) {
      case "batch":
        result = await handleBatch(query, config);
        break;
      case "view":
        result = await handleView(event, query, config);
        break;
      case "like":
        result = await handleLike(event, query, config);
        break;
      case "liked":
        result = await handleLiked(event, query);
        break;
      default:
        log("Unknown action:", action);
        throw createError({ statusCode: 404, message: "Unknown action" });
    }
    log("Result:", JSON.stringify(result).slice(0, 200));
    return result;
  } catch (e) {
    log("Error:", e.message);
    console.error("[Stats API] Error:", e.message);
    throw e;
  }
});

export { stats as default };
//# sourceMappingURL=stats.mjs.map
