import Pet from '../models/Pet.js'
import Historico from '../models/Historico.js'

class ProntuarioController {
  async index(req, res) {
    try {
      const { petId } = req.params
      const pet = await Pet.findByPk(petId)
      if (!pet) return res.status(404).json({ errors: ['Pet não encontrado'] })

      const historicos = await Historico.findAll({ where: { pet_id: petId }, order: [['created_at', 'DESC']] })
      return res.json(historicos)
    } catch (err) {
      return res.status(500).json({ errors: [err.message] })
    }
  }

  async store(req, res) {
    try {
      const { petId } = req.params
      const pet = await Pet.findByPk(petId)
      if (!pet) return res.status(404).json({ errors: ['Pet não encontrado'] })

      const { data, tipo, descricao, responsavel, arquivos } = req.body
      const entry = await Historico.create({ pet_id: petId, data, tipo, descricao, responsavel, arquivos: arquivos ? JSON.stringify(arquivos) : null })

      return res.json({ id: entry.id, data: entry.data, tipo: entry.tipo, descricao: entry.descricao, responsavel: entry.responsavel, arquivos: arquivos || [] })
    } catch (err) {
      if (err.errors) return res.status(400).json({ errors: err.errors.map(e => e.message) })
      return res.status(500).json({ errors: [err.message] })
    }
  }
}

export default new ProntuarioController()
