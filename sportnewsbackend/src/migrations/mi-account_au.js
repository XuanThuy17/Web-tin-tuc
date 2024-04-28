'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Account_au', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'), 
        defaultValue: 'pending'
      },
      roleID: {
        type: Sequelize.INTEGER,
      },
      birthday: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      img_avt: {
        type: Sequelize.BLOB('long')
      },
      gender: {
        type: Sequelize.ENUM('Male','Female','Other')
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
    await queryInterface.dropTable('Account_au');
  }
};