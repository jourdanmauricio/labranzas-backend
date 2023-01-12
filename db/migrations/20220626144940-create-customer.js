'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        field: 'NAME',
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      last_name: {
        field: 'LAST_NAME',
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      phone: {
        field: 'PHONE',
        allowNull: true,
        type: DataTypes.STRING,
      },
      document_type: {
        field: 'DOCUMENT_TYPE',
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      document_number: {
        field: 'DOCUMENT_NUMBER',
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      user_id: {
        field: 'USER_ID',
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        field: 'CREATED_AT',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        field: 'UPDATED_AT',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
