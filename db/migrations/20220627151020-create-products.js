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
        type: DataTypes.INTEGER,
      },
      attributes: { type: DataTypes.JSON, allowNull: true },
      title: { type: DataTypes.STRING, allowNull: false },
      seller_custom_field: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      available_quantity: { type: DataTypes.INTEGER, allowNull: false },
      sold_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      description: { type: DataTypes.TEXT, allowNull: true },
      pictures: { type: DataTypes.JSON, allowNull: false },
      thumbnail: { type: DataTypes.STRING, allowNull: false },
      condition: { type: DataTypes.STRING, allowNull: false },
      listing_type_id: { type: DataTypes.STRING, allowNull: false },
      sale_terms: { type: DataTypes.JSON, allowNull: true },
      variations: { type: DataTypes.JSON, allowNull: true },
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
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_products_status'
    );
  },
};
