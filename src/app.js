import express from 'express'
import bodyParser from 'body-parser'
import bibliotecaRoutes from './router/bibliotecaRoutes.js'
import cors from 'cors'
import { createClient } from 'redis';

// Crear instancia de Express
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Montar rutas de Bilioteca
app.use('/biblioteca', bibliotecaRoutes)

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

// Arrancar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })


// Conectar a Redis
const client = createClient();
//callback para errores
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
