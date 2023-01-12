'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        field: 'EMAIL',
        allowNull: false,
        type: DataTypes.STRING(150),
        unique: true,
      },
      password: {
        field: 'PASSWORD',
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      recovery_token: {
        field: 'RECOVERY_TOKEN',
        allowNull: true,
        type: DataTypes.STRING(150),
      },
      role: {
        field: 'ROLE',
        allowNull: false,
        type: DataTypes.STRING(20),
        defaultValue: 'customer',
      },
      created_at: {
        field: 'CREATED_AT',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        field: 'UPDATED_AT',
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  },
};
