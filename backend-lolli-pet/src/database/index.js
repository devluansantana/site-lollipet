import Sequelize from 'sequelize'
import databaseConfig from '../config/database.js'
import Veterinario from '../models/Veterinario.js'
import Foto from '../models/Foto.js'
import Cliente from '../models/Cliente.js'
import Pet from '../models/Pet.js'
import Agendamento from '../models/Agendamento.js'
import Prontuario from '../models/Prontuario.js'
import ProntuarioArquivo from '../models/ProntuarioArquivo.js'



const models = [Veterinario, Foto, Cliente, Pet, Prontuario, ProntuarioArquivo, Agendamento]

const connection = new Sequelize(databaseConfig)

models.forEach((model) => { model.init(connection) })
models.forEach((model) => { model.associate && model.associate(connection.models) })
