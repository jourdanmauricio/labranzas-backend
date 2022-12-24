'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_WEB_TABLE } = require('./../models/productWeb.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_WEB_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      prod_id: {
        type: DataTypes.NUMBER(10),
        references: { model: PRODUCT_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_custom_field: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      available_quantity: { type: DataTypes.NUMBER(6), allowNull: false },
      sold_quantity: { type: DataTypes.NUMBER(6), allowNull: false },
      status: {
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
      listing_type_id: { allowNull: false, type: DataTypes.STRING(50) },
      permalink: { allowNull: true, type: DataTypes.STRING },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      variations: {
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
    await queryInterface.dropTable(PRODUCT_WEB_TABLE);
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_products_web_status'
    );
  },
};
