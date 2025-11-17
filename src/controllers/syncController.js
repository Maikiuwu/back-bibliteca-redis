import { syncSupabaseToMongo } from '../supabaseToMongo.js'

export async function sync(req, res) {



  const data = req.body;
  await syncSupabaseToMongo(data)
  console.log('Sincronización completada')
  res.json({ message: 'Sincronización completada' })
}