'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER(10),
      },
      attributes: {
        // type: DataTypes.JSON,
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
      title: { type: DataTypes.STRING, allowNull: false },
      seller_custom_field: { type: DataTypes.STRING(30), allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      // price: { type: DataTypes.INTEGER, allowNull: false },
      available_quantity: { type: DataTypes.NUMBER(6), allowNull: false },
      sold_quantity: {
        type: DataTypes.NUMBER(6),
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM([
          'pending',
          'under_review',
          'inactive',
          'active',
          'paused',
          'closed',
        ]),
        allowNull: false,
      },
      description: { type: DataTypes.STRING(5000), allowNull: true },
      pictures: {
        // type: DataTypes.JSON, allowNull: false
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('pictures'));
        },
        set(value) {
          this.setDataValue('pictures', JSON.stringify(value));
        },
      },
      thumbnail: { type: DataTypes.STRING, allowNull: false },
      condition: { type: DataTypes.STRING(10), allowNull: false },
      listing_type_id: { type: DataTypes.STRING(20), allowNull: false },
      sale_terms: {
        // type: DataTypes.JSON, allowNull: true
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('sale_terms'));
        },
        set(value) {
          this.setDataValue('sale_terms', JSON.stringify(value));
        },
      },
      variations: {
        // type: DataTypes.JSON, allowNull: true
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('variations'));
        },
        set(value) {
          this.setDataValue('variations', JSON.stringify(value));
        },
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_time',
        defaultValue: Sequelize.NOW,
      },
      video_id: { type: DataTypes.STRING, allowNull: true },
      category_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: { model: CATEGORY_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    // await queryInterface.sequelize.query(
    //   'DROP TYPE IF EXISTS enum_products_status'
    // );
  },
};
