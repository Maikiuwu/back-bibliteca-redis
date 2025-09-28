import { Router } from 'express'
import { Login, Save } from '../controllers/authController.js'

const router = Router()

router.post('/login', Login)
router.post('/save', Save)


export default router
