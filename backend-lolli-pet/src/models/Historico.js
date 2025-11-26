import Sequelize, { Model } from 'sequelize'

export default class Historico extends Model {
  static init(sequelize) {
    super.init(
      {
        pet_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        data: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tipo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        responsavel: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        arquivos: {
          type: Sequelize.TEXT, // JSON stringified
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'historicos',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' })
  }
}
