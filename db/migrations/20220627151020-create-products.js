'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER(10),
      },
      attributes: {
        field: 'ATTRIBUTES',
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
      title: {
        field: 'TITLE',
        type: DataTypes.STRING,
        allowNull: false,
      },
      seller_custom_field: {
        field: 'SELLER_CUSTOM_FIELD',
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      price: {
        field: 'PRICE',
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      available_quantity: {
        field: 'AVAILABLE_QUANTITY',
        type: DataTypes.NUMBER(6),
        allowNull: false,
      },
      sold_quantity: {
        field: 'SOLD_QUANTITY',
        type: DataTypes.NUMBER(6),
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        field: 'STATUS',
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
      description: {
        field: 'DESCRIPTION',
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      pictures: {
        field: 'PICTURES',
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
      thumbnail: {
        field: 'THUMBNAIL',
        type: DataTypes.STRING,
        allowNull: false,
      },
      condition: {
        field: 'CONDITION',
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      listing_type_id: {
        field: 'LISTING_TYPE_ID',
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      sale_terms: {
        field: 'SALE_TERMS',
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
      start_time: {
        field: 'START_TIME',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      video_id: {
        field: 'VIDEO_ID',
        type: DataTypes.STRING,
        allowNull: true,
      },
      category_id: {
        field: 'CATEGORY_ID',
        allowNull: false,
        type: DataTypes.STRING,
        references: { model: CATEGORY_TABLE, key: 'ID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable(PRODUCT_TABLE);
    // await queryInterface.sequelize.query(
    //   'DROP TYPE IF EXISTS enum_products_status'
    // );
  },
};
