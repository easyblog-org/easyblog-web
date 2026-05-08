import { MongoClient } from 'mongodb'

const config = useRuntimeConfig()
console.log('[MongoDB] Initializing...')
console.log('[MongoDB] URI:', config.mongoUri ? config.mongoUri.substring(0, 30) + '...' : '❌ MISSING')
console.log('[MongoDB] DB:', config.mongoDbName)
console.log('[MongoDB] Collection:', config.mongoCollectionName)

const client = new MongoClient(config.mongoUri)

let isConnected = false

export async function getDb() {
  if (!isConnected) {
    console.log('[MongoDB] Connecting to database...')
    await client.connect()
    isConnected = true
    console.log('[MongoDB] Connected ✅')
  }
  const db = client.db(config.mongoDbName)
  console.log(`[MongoDB] Using DB: ${config.mongoDbName}`)
  return db
}

export async function getCollection(name) {
  const db = await getDb()
  const collName = name || config.mongoCollectionName || 'articles'
  console.log(`[MongoDB] Using collection: ${collName}`)
  return db.collection(collName)
}
