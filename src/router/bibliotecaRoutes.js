import { Router } from 'express'
import { Login, Register, Home } from '../controllers/bibliotecaControllers.js'

const router = Router()

router.get('/login', Login)
router.get('/register', Register)
router.get('/home', Home)

export default router
