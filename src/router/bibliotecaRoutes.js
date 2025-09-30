import { Router } from 'express'
import { Login, Delete } from '../controllers/authController.js'

const router = Router()

router.post('/login', Login)
router.post('/Delete', Delete)


export default router
