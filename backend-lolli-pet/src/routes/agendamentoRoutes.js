import { Router } from 'express'
import agendamentoController from '../controllers/AgendamentoController.js'
import loginRequired from '../middlewares/loginRequired.js'

const router = new Router()

router.post('/', loginRequired, agendamentoController.store)
router.get('/', loginRequired, agendamentoController.index)
router.get('/:id', loginRequired, agendamentoController.show)
router.put('/', loginRequired, agendamentoController.update)
router.delete('/', loginRequired, agendamentoController.delete)

export default router
