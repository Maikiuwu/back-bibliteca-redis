import { Router } from 'express'
import { Login, Delete } from '../controllers/authController.js'
import { syncData, getAggregates } from '../controllers/syncController.js'

const router = Router()

router.post('/login', Login)
router.post('/Delete', Delete)

// endpoint para sincronizar (borra y re-crea agregados)
router.post('/sync-aggregates', syncData)

// endpoint para obtener agregados desde Mongo
router.get('/aggregates', getAggregates)

export default router
