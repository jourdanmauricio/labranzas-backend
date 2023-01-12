'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { ADDRESS_TABLE } = require('./../models/address.model');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ADDRESS_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        field: 'USER_ID',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      type: {
        field: 'TYPE',
        type: DataTypes.ENUM('customer', 'delivery', 'billing'),
        allowNull: false,
      },
      country: {
        field: 'COUNTRY',
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      province: {
        field: 'PROVINCE',
        allowNull: false,
        type: DataTypes.STRING(70),
      },
      city: {
        field: 'CITY',
        allowNull: false,
        type: DataTypes.STRING(70),
      },
      neighborhood: {
        field: 'NEIGHBORHOOD',
        allowNull: true,
        type: DataTypes.STRING(70),
      },
      postal_code: {
        field: 'POSTAL_CODE',
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      street: {
        field: 'STREET',
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      street_number: {
        field: 'STREET_NUMBER',
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      flat: {
        field: 'FLAT',
        allowNull: true,
        type: DataTypes.STRING(10),
      },
      comment: {
        field: 'COMMENT',
        allowNull: true,
        type: DataTypes.STRING,
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
    await queryInterface.dropTable(ADDRESS_TABLE);
  },
};
