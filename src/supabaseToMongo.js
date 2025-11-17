import 'dotenv/config'
import mongoose from 'mongoose'
import { client as supabaseClient } from './supabase/client.js'

// Conectar a MongoDB (require MONGO_ADMIN in env)
const mongoUri = "mongodb+srv://mige:123@cluster0.y1v1brx.mongodb.net/"
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

// Definir esquema de ejemplo (ajusta según tus necesidades)
const dataSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
}, { collection: 'supabase_data' })

const DataModel = mongoose.model('SupabaseData', dataSchema)

// Función para traer datos de Supabase y pasarlos a MongoDB
export async function syncSupabaseToMongo(tabla) {
    try {
        console.log(`Iniciando sincronización...`)

        if (!tabla || tabla.length === 0) {
            console.log(`No hay datos en la tabla ${tableName}`)
            return
        }

        // Insertar datos en MongoDB
        const result = await DataModel.insertMany(tabla, { ordered: false })
        console.log(`✓ ${result.length} registros insertados en MongoDB`)

        return result
    } catch (err) {
        console.error('Error en sincronización:', err.message)
        throw err
    }
}

// Función para actualizar datos específicos
export async function updateSupabaseDataInMongo(tableName, filter, updateData) {
    try {
        console.log(`Actualizando datos en MongoDB...`)

        const result = await DataModel.updateMany(filter, updateData)
        console.log(`✓ ${result.modifiedCount} registros actualizados`)

        return result
    } catch (err) {
        console.error('Error al actualizar:', err.message)
        throw err
    }
}

// Función para eliminar datos
export async function deleteSupabaseDataFromMongo(filter) {
    try {
        console.log(`Eliminando datos de MongoDB...`)

        const result = await DataModel.deleteMany(filter)
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
