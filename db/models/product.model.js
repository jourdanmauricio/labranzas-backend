const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  attributes: { type: DataTypes.JSON, allowNull: true },
  title: { type: DataTypes.STRING, allowNull: false },
  seller_custom_field: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  available_quantity: { type: DataTypes.INTEGER, allowNull: false },
  sold_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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
    type: DataTypes.INTEGER,
    references: { model: CATEGORY_TABLE, key: 'id' },
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
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
      timestamps: true,
      underscored: true,
    };
  }
}
module.exports = { PRODUCT_TABLE, ProductSchema, Product };
