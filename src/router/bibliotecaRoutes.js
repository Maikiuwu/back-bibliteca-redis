import { Router } from 'express'
import { Login, Delete } from '../controllers/authController.js'
import { sync } from '../controllers/syncController.js'

const router = Router()

router.post('/login', Login)
router.post('/Delete', Delete)
router.post('/sync', sync)


export default router
