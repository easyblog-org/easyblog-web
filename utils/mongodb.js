import { MongoClient } from 'mongodb'

const client = new MongoClient(useRuntimeConfig().mongoUri)

let isConnected = false

export async function getDb() {
  if (!isConnected) {
    await client.connect()
    isConnected = true
  }
  return client.db('easyblog')
}

export async function getCollection(name) {
  const db = await getDb()
  return db.collection(name)
}
