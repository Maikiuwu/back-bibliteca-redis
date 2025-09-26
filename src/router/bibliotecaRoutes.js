import { Router } from 'express'
import { Login, Register, Home } from '../controllers/bibliotecaControllers.js'

const router = Router()

router.get('/Login', Login)
router.get('/Register', Register)
router.get('/Home', Home)

export default router
