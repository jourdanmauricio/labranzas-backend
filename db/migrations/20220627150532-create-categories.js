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
        type: DataTypes.JSON,
        allowNull: true,
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
      attributes_oblg: {
        type: DataTypes.JSON,
        allowNull: true,
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
