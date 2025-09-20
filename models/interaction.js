'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interaction.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    type: DataTypes.ENUM('Llamada', 'Mensaje', 'Email', 'Reunión'),
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};