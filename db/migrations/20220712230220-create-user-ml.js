'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_ML_TABLE } = require('./../models/userMl.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_ML_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        field: 'NICKNAME',
        allowNull: true,
        type: DataTypes.STRING(),
      },
      access_token: {
        field: 'ACCESS_TOKEN',
        allowNull: true,
        type: DataTypes.STRING(),
      },
      token_type: {
        field: 'TOKEN_TYPE',
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      expires_in: {
        field: 'EXPIRES_IN',
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      scope: {
        field: 'SCOPE',
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      refresh_token: {
        field: 'REFRESH_TOKEN',
        allowNull: true,
        type: DataTypes.STRING(),
      },
      permalink: {
        field: 'PERMALINK',
        allowNull: true,
        type: DataTypes.STRING(),
      },
      site_id: {
        field: 'SITE_ID',
        allowNull: true,
        type: DataTypes.STRING(3),
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
    await queryInterface.dropTable(USER_ML_TABLE);
  },
};
