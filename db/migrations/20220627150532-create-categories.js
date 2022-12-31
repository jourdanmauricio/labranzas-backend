'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      path_from_root: {
        // type: DataTypes.JSON,
        // allowNull: true,
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('path_from_root'));
        },
        set(value) {
          this.setDataValue('path_from_root', JSON.stringify(value));
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      settings: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('settings'));
        },
        set(value) {
          this.setDataValue('settings', JSON.stringify(value));
        },
      },
      attributes: {
        // type: DataTypes.JSON,
        // allowNull: true,
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('attributes'));
        },
        set(value) {
          this.setDataValue('attributes', JSON.stringify(value));
        },
      },
      attributes_details: {
        type: DataTypes.TEXT,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('attributes_details'));
        },
        set(value) {
          this.setDataValue('attributes_details', JSON.stringify(value));
        },
      },
      description_web: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
