const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const PRODUCT_TABLE = 'PRODUCTS';
const ProductSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  title: { field: 'TITLE', type: DataTypes.STRING, allowNull: false },
  seller_custom_field: {
    field: 'SELLER_CUSTOM_FIELD',
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: { field: 'PRICE', type: DataTypes.DOUBLE, allowNull: false },
  available_quantity: {
    field: 'AVAILABLE_QUANTITY',
    type: DataTypes.INTEGER(6),
    allowNull: false,
  },
  sold_quantity: {
    field: 'SOLD_QUANTITY',
    type: DataTypes.INTEGER(6),
    allowNull: false,
    defaultValue: 0,
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
  description: {
    field: 'DESCRIPTION',
    type: DataTypes.STRING,
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
  thumbnail: { field: 'THUMBNAIL', type: DataTypes.STRING, allowNull: false },
  condition: { field: 'CONDITION', type: DataTypes.STRING, allowNull: false },
  listing_type_id: {
    field: 'LISTING_TYPE_ID',
    type: DataTypes.STRING,
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
      return JSON.parse(this.getDataValue('variations'));
    },
    set(value) {
      this.setDataValue('variations', JSON.stringify(value));
    },
  },
  start_time: {
    field: 'START_TIME',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  video_id: { field: 'VIDEO_ID', type: DataTypes.STRING, allowNull: true },
  category_id: {
    field: 'CATEGORY_ID',
    allowNull: false,
    type: DataTypes.STRING,
    references: { model: CATEGORY_TABLE, key: 'ID' },
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
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
};
class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
    this.hasOne(models.ProductMl, { as: 'prodMl', foreignKey: 'prod_id' });
    this.hasOne(models.ProductWeb, { as: 'prodWeb', foreignKey: 'prod_id' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
      underscored: true,
    };
  }
}
module.exports = { PRODUCT_TABLE, ProductSchema, Product };
