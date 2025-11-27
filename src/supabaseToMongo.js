import 'dotenv/config'
import mongoose from 'mongoose'
import { client as supabaseClient } from './supabase/client.js'

// Conectar a MongoDB usando variable de entorno MONGO_ADMIN (asegúrate .env existe)
const mongoUri = "mongodb+srv://mige:123@cluster0.y1v1brx.mongodb.net/Biblioteca"
if (!mongoUri) {
  console.error('✗ MONGO_ADMIN no está definido. Añade la URI de MongoDB Atlas en .env como MONGO_ADMIN=...') 
  process.exit(1)
}

try {
  await mongoose.connect(mongoUri)
  console.log('✓ MongoDB conectado')
} catch (err) {
  console.error('✗ Error conexión MongoDB:', err.message)
  process.exit(1)
}

const aggregateSchema = new mongoose.Schema({
  nombre: String,
  tipos: Object,
  cantidades_de_cada_tipo: Object
}, { collection: 'aggregates' })

const AggregateModel = mongoose.model('Aggregate', aggregateSchema)

/**
 * Construye documentos de agregados (tipo, genero, autor, año)
 * Devuelve un array de objetos con la forma:
 * { nombre, tipos: { "1": "label", ... }, cantidades_de_cada_tipo: { "1": 3, ... } }
 */
export async function buildAggregatesFromSupabase() {
  // Traer filas principales
  const { data: rows, error: errRows } = await supabaseClient
    .from('materialbibliografico')
    .select('id, id_tipo, id_genero, aniodepublicacion, autor')
  if (errRows) throw errRows

  // Traer tablas de referencia
  const { data: tiposRef = [], error: errTipo } = await supabaseClient
    .from('tipomaterial')
    .select('id, tipo')
  if (errTipo) throw errTipo

  const { data: generosRef = [], error: errGen } = await supabaseClient
    .from('material_genero')
    .select('id_genero, clasificacion')
  if (errGen) throw errGen

  // Contar por claves
  const countsTipo = {}
  const countsGenero = {}
  const countsAutor = {}
  const countsAnio = {}

  for (const r of rows || []) {
    const t = r.id_tipo ?? 'null'
    const g = r.id_genero ?? 'null'
    const a = (r.autor || 'Sin autor').trim() || 'Sin autor'
    const y = r.aniodepublicacion ? String(r.aniodepublicacion) : 'Sin año'

    countsTipo[String(t)] = (countsTipo[String(t)] || 0) + 1
    countsGenero[String(g)] = (countsGenero[String(g)] || 0) + 1
    countsAutor[a] = (countsAutor[a] || 0) + 1
    countsAnio[y] = (countsAnio[y] || 0) + 1
  }

  // Crear documento para "tipo"
  const tiposMap = {}
  const cantidadesTipo = {}
  // usar ids de tipomaterial como keys (string)
  for (const t of tiposRef) {
    tiposMap[String(t.id)] = t.tipo
    cantidadesTipo[String(t.id)] = countsTipo[String(t.id)] || 0
  }
  // añadir cualquier tipo encontrado en rows pero no en referencia
  for (const k of Object.keys(countsTipo)) {
    if (k === 'null') continue
    if (!tiposMap[k]) {
      tiposMap[k] = `Tipo ${k}`
      cantidadesTipo[k] = countsTipo[k]
    }
  }

  // "genero"
  const genMap = {}
  const cantidadesGen = {}
  for (const g of generosRef) {
    genMap[String(g.id_genero)] = g.clasificacion
    cantidadesGen[String(g.id_genero)] = countsGenero[String(g.id_genero)] || 0
  }
  for (const k of Object.keys(countsGenero)) {
    if (k === 'null') continue
    if (!genMap[k]) {
      genMap[k] = `Género ${k}`
      cantidadesGen[k] = countsGenero[k]
    }
  }

  // "autor" -> numerar índices (1..n) para types object
  const autorKeys = Object.keys(countsAutor).sort((a,b) => countsAutor[b] - countsAutor[a])
  const autorMap = {}
  const cantidadesAutor = {}
  autorKeys.forEach((autor, idx) => {
    const key = String(idx + 1)
    autorMap[key] = autor
    cantidadesAutor[key] = countsAutor[autor]
  })

  // "año"
  const anioKeys = Object.keys(countsAnio).sort((a,b) => {
    if (a === 'Sin año') return 1
    if (b === 'Sin año') return -1
    return Number(b) - Number(a)
  })
  const anioMap = {}
  const cantidadesAnio = {}
  anioKeys.forEach((anio, idx) => {
    const key = String(idx + 1)
    anioMap[key] = anio
    cantidadesAnio[key] = countsAnio[anio]
  })

  const documents = [
    { nombre: 'tipo', tipos: tiposMap, cantidades_de_cada_tipo: cantidadesTipo },
    { nombre: 'genero', tipos: genMap, cantidades_de_cada_tipo: cantidadesGen },
    { nombre: 'autor', tipos: autorMap, cantidades_de_cada_tipo: cantidadesAutor },
    { nombre: 'año', tipos: anioMap, cantidades_de_cada_tipo: cantidadesAnio }
  ]

  return documents
}

/**
 * Borra la colección de agregados y escribe los nuevos documentos
 */
export async function syncAggregatesToMongo() {
  try {
    // borrar todo
    await AggregateModel.deleteMany({})
    const docs = await buildAggregatesFromSupabase()
    const result = await AggregateModel.insertMany(docs)
    return result
  } catch (err) {
    console.error('Error syncAggregatesToMongo:', err)
    throw err
  }
}

/**
 * Obtener los agregados guardados en Mongo
 */
export async function getAggregatesFromMongo() {
  return AggregateModel.find({}).lean()
}
