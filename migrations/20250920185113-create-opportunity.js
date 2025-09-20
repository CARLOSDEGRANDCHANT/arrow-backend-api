'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Opportunities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage: {
        type: Sequelize.ENUM('Nuevo contacto', 'Interesado', 'Asesoria en proceso', 'Propuesta enviada', 'Cliente'),
        defaultValue: 'Nuevo contacto',
        allowNull: false
      },
      estimated_value: {
        type: Sequelize.DECIMAL
      },
      expected_close: {
        type: Sequelize.DATE
      },
      source: {
        type: Sequelize.ENUM('Trabajo de campo', 'Facebook', 'WhatsApp', 'Llamada'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Opportunities');
  }
};