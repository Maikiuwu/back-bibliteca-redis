import 'dotenv/config'
import mongoose from 'mongoose'
import { client as supabaseClient } from './supabase/client.js'

// Conectar a MongoDB (require MONGO_ADMIN in env)
const mongoUri = "mongodb+srv://mige:123@cluster0.y1v1brx.mongodb.net/Biblioteca"
if (!mongoUri) {
    console.error('✗ MONGO_ADMIN no está definido. Añade la URI de MongoDB Atlas en el archivo .env como MONGO_ADMIN=...')
    process.exit(1)
}

try {
    await mongoose.connect(mongoUri)
    console.log('✓ MongoDB conectado')
} catch (err) {
    console.error('✗ Error conexión MongoDB:', err.message)
    process.exit(1)
}

const dataSchema = new mongoose.Schema({
    id: String,
    id_tipo: String,
    titulo: String,
    autor: String,
    genero: String,
    aniodepublicacion: String,
    disponibilidad: String,
}, { collection: 'supabase_data' })

const DataModel = mongoose.model('SupabaseData', dataSchema)

// Función para traer datos de Supabase y pasarlos a MongoDB
export async function syncSupabaseToMongo(datos) {
    try {
        console.log(`Iniciando sincronización...`)

        // Insertar datos en MongoDB
        const result = await DataModel.insertMany(datos, { ordered: false })
        console.log(`✓ ${result.length} registros insertados en MongoDB`)

        return result
    } catch (err) {
        console.error('Error en sincronización:', err.message)
        throw err
    }
}

// Función para actualizar datos específicos
export async function updateSupabaseDataInMongo(datos) {
    try {
        console.log(`Actualizando datos en MongoDB...`)

        const result = await DataModel.updateMany(datos)
        console.log(`✓ ${result.modifiedCount} registros actualizados`)

        return result
    } catch (err) {
        console.error('Error al actualizar:', err.message)
        throw err
    }
}

// Función para eliminar datos
export async function deleteSupabaseDataFromMongo(datos) {
    try {
        console.log(`Eliminando datos de MongoDB...`)

        const result = await DataModel.deleteMany(datos)
        console.log(`✓ ${result.deletedCount} registros eliminados`)

        return result
    } catch (err) {
        console.error('Error al eliminar:', err.message)
        throw err
    }
}

// Ejemplo de uso
if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        // Sincronizar tabla 'books' de Supabase a MongoDB
        await syncSupabaseToMongo('books')
        
        // Cerrar conexión
        mongoose.connection.close()
        console.log('Conexión a MongoDB cerrada')
    } catch (err) {
        console.error('Error:', err)
        process.exit(1)
    }
}
