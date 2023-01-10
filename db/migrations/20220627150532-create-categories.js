'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        field: 'ID',
        type: DataTypes.STRING(20),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      name: {
        field: 'NAME',
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      full_name: {
        field: 'FULL_NAME',
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      path_from_root: {
        field: 'PATH_FROM_ROOT',
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('PATH_FROM_ROOT'));
        },
        set(value) {
          this.setDataValue('PATH_FROM_ROOT', JSON.stringify(value));
        },
      },
      picture: {
        field: 'PICTURE',
        type: DataTypes.STRING,
        allowNull: true,
      },
      settings: {
        field: 'SETTINGS',
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('SETTINGS'));
        },
        set(value) {
          this.setDataValue('SETTINGS', JSON.stringify(value));
        },
      },
      attributes: {
        field: 'ATTRIBUTES',
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('ATTRIBUTES'));
        },
        set(value) {
          this.setDataValue('ATTRIBUTES', JSON.stringify(value));
        },
      },
      attributes_details: {
        field: 'ATTRIBUTES_DETAILS',
        type: DataTypes.TEXT,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('ATTRIBUTES_DETAILS'));
        },
        set(value) {
          this.setDataValue('ATTRIBUTES_DETAILS', JSON.stringify(value));
        },
      },
      description_web: {
        field: 'DESCRIPTION_WEB',
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
