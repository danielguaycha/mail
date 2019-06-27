const Sequelize = require('sequelize');
const sequelize  = require('./../connect');

class Email extends Sequelize.Model {
}

Email.init({
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    emisor: Sequelize.STRING,
    receptor: Sequelize.STRING,
    estado: Sequelize.INTEGER,
    leido: Sequelize.BOOLEAN,
    asunto: Sequelize.STRING,
    extrainfo: Sequelize.STRING,
    contenido: Sequelize.TEXT,
    fecha: Sequelize.DATE
  },
  {
    sequelize: sequelize,
    modelName: 'email',
    timestamps: false,    
  })
  
  module.exports = Email