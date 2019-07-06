const Sequelize = require('sequelize');
const sequelize  = require('./../connect');

class Category extends Sequelize.Model {
}

Category.init({
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING,    
    value: Sequelize.INTEGER,    
  },
  {
    sequelize: sequelize,
    modelName: 'categorias',
    timestamps: false,    
  })
  
  module.exports = Category