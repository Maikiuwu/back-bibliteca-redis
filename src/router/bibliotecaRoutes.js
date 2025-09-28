import { Router } from 'express'
import { Login, Save, Home } from '../controllers/authController.js'

const router = Router()

router.post('/login', Login)
router.post('/save', Save)
router.get('/home', Home)

export default router
