"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change the Users.email -> validate
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Change the Users.phone
    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Change the Users.code
    await queryInterface.changeColumn("Users", "code", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });

    // Change the Users.password
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert Users.email
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
    });

    // Revert Users.phone
    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.STRING,
    });

    // Revert Users.code
    await queryInterface.changeColumn("Users", "code", {
      type: Sequelize.STRING,
    });

    // Revert Users.password
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
    });
  },
};