'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_WEB_TABLE } = require('./../models/productWeb.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_WEB_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      prod_id: {
        field: 'PROD_ID',
        type: DataTypes.NUMBER(10),
        unique: true,
        references: { model: PRODUCT_TABLE, key: 'ID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_custom_field: {
        field: 'SELLER_CUSTOM_FIELD',
        type: DataTypes.STRING(30),
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
        allowNull: true,
        type: DataTypes.STRING,
      },
      new_product: {
        field: 'NEW_PRODUCT',
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      featured: {
        field: 'FEATURED',
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      best_sellers: {
        field: 'BEST_SELLERS',
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      trend: {
        field: 'TREND',
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      related_products: {
        field: 'RELATED_PRODUCTS',
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]',
        get() {
          return JSON.parse(this.getDataValue('related_products'));
        },
        set(value) {
          this.setDataValue('related_products', JSON.stringify(value));
        },
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
    await queryInterface.dropTable(PRODUCT_WEB_TABLE);
    // await queryInterface.sequelize.query(
    //   'DROP TYPE IF EXISTS enum_products_web_status'
    // );
  },
};
