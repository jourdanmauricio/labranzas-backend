'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_ML_TABLE } = require('../models/productMl.model');
const { PRODUCT_TABLE } = require('../models/product.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_ML_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING(20),
      },
      prod_id: {
        field: 'PROD_ID',
        type: DataTypes.INTEGER,
        unique: true,
        references: { model: PRODUCT_TABLE, key: 'ID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_custom_field: {
        field: 'SELLER_CUSTOM_FIELD',
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: { field: 'PRICE', type: DataTypes.DOUBLE, allowNull: false },
      available_quantity: {
        field: 'AVAILABLE_QUANTITY',
        type: DataTypes.NUMBER(6),
        allowNull: false,
      },
      sold_quantity: {
        field: 'SOLD_QUANTITY',
        type: DataTypes.NUMBER(6),
        allowNull: false,
      },
      status: {
        field: 'STATUS',
        type: DataTypes.ENUM(
          'pending',
          'under_review',
          'inactive',
          'active',
          'paused',
          'closed'
        ),
        allowNull: false,
      },
      listing_type_id: {
        field: 'LISTING_TYPE_ID',
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      permalink: {
        field: 'PERMALINK',
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_time: {
        field: 'START_TIME',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      variations: {
        field: 'VARIATIONS',
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('VARIATIONS'));
        },
        set(value) {
          this.setDataValue('VARIATIONS', JSON.stringify(value));
        },
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
    await queryInterface.dropTable(PRODUCT_ML_TABLE);
    // await queryInterface.sequelize.query(
    //   'DROP TYPE IF EXISTS enum_products_ml_status'
    // );
  },
};
