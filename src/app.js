import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import bibliotecaRoutes from './router/bibliotecaRoutes.js'
import cors from 'cors'
import { client as supabaseClient } from './supabase/client.js'
import { syncAggregatesToMongo } from './supabaseToMongo.js' // <- import corregido

// Crear instancia de Express
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Montar rutas de Biblioteca
app.use('/biblioteca', bibliotecaRoutes)

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada en el back.' })
})

// Arrancar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  try {
    // opcional: sincronizar al iniciar
    await syncAggregatesToMongo()
    console.log('Aggregates synced to Mongo')
  } catch (err) {
    console.error('Sync error:', err.message)
  }
})


// Conectar a Redis

/*
await client.set('foo', 'bar');
await client.set('user', JSON.stringify({username: 'admin', password: 'admin123'}));
const result = await client.get('foo');
const user = await client.get('user');
console.log(user)
console.log(result)  // >>> bar
*/
