import { syncSupabaseToMongo } from '../supabaseToMongo.js'
import { deleteSupabaseDataFromMongo } from '../supabaseToMongo.js';
import { updateSupabaseDataInMongo } from '../supabaseToMongo.js';

export async function syncData(req, res) {

  const data = req.body;
  await syncSupabaseToMongo(data)
  console.log('Sincronización completada')
  res.json({ message: 'Sincronización completada' })

}

export async function updateData(req, res) {

  const data = req.body;
  await updateSupabaseDataInMongo(data)
  console.log('Actualización completada')
  res.json({ message: 'Actualización completada' })

}

export async function deleteData(req, res) { 

  const data = req.body;
  await deleteSupabaseDataFromMongo(data)
  console.log('Eliminación completada')
  res.json({ message: 'Eliminación completada' })

}