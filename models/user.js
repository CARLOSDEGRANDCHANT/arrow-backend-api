'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Por favor ingrese un email valido."
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "La contraseña debe contener al menos 8 caracteres."
        },
        hasNumber(value){
          if (!/\d/.test(value)) {
            throw new Error('La contraseña debe contener un numero.');
          }
        },
        hasLowercase(value) {
          if (!/[a-z]/.test(value)) {
            throw new Error('La contrsaseña debe contener una letra minuscula..');
          }
        },
        hasUppercase(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('La contrsaseña debe contener una letra mayuscula.');
          }
        }
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'agent'),
      defaultValue: 'agent'
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // Password hashing
  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};