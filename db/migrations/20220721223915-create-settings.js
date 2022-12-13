'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { SETTING_TABLE } = require('./../models/setting.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SETTING_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      setting: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
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
