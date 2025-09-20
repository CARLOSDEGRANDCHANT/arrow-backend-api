'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opportunity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Opportunity.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    stage: {
      type: DataTypes.ENUM('Nuevo contacto', 'Interesado', 'Asesoria en proceso', 'Propuesta enviada', 'Cliente'),
      defaultValue: 'Nuevo contacto',
      allowNull: false
    },
    estimated_value: DataTypes.DECIMAL,
    expected_close: DataTypes.DATE,
    source: {
        type: DataTypes.ENUM('Trabajo de campo', 'Facebook', 'WhatsApp', 'Llamada'),
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'Opportunity',
  });
  return Opportunity;
};