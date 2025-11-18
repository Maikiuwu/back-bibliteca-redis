import { Router } from 'express'
import { Login, Delete } from '../controllers/authController.js'
import { syncData, deleteData } from '../controllers/syncController.js'

const router = Router()

router.post('/login', Login)
router.post('/Delete', Delete)
router.post('/sync', syncData)
router.post('/deleteMongo', deleteData)

export default router
