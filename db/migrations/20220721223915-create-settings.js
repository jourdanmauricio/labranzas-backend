'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { SETTING_TABLE } = require('./../models/setting.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SETTING_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      setting: {
        field: 'SETTING',
        allowNull: false,
        type: DataTypes.JSON,
      },
      created_at: {
        field: 'CREATED_AT',
        allowNull: true,
        type: DataTypes.DATE,
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
    await queryInterface.dropTable(SETTING_TABLE);
  },
};
