import { Router } from 'express'
import prontuarioController from '../controllers/ProntuarioController.js'
import loginRequired from '../middlewares/loginRequired.js'

const router = new Router()

// Permite desabilitar checagem de auth em dev definindo DISABLE_AUTH=true no .env
const authMiddleware = process.env.DISABLE_AUTH === 'true' ? (req, res, next) => next() : loginRequired

// GET all historicos for a pet
router.get('/:petId', authMiddleware, prontuarioController.index)
// POST new historico for a pet
router.post('/:petId/historico', authMiddleware, prontuarioController.store)

export default router
