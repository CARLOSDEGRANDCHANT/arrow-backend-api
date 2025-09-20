'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PolicyTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PolicyTemplate.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('BOB', 'USD', 'EUR'),
      allowNull: false
    },
    premium: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PolicyTemplate',
  });
  return PolicyTemplate;
};