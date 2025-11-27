import { syncAggregatesToMongo, getAggregatesFromMongo } from '../supabaseToMongo.js'

export async function syncData(req, res) {
  try {
    const inserted = await syncAggregatesToMongo()
    res.json({ inserted: inserted.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export async function getAggregates(req, res) {
  try {
    const docs = await getAggregatesFromMongo()
    res.json(docs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}