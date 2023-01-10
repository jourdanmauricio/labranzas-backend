const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_WEB_TABLE = 'PRODUCTS_WEB';

const ProductWebSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  prod_id: {
    field: 'PROD_ID',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  seller_custom_field: {
    field: 'SELLER_CUSTOM_FIELD',
    allowNull: true,
    type: DataTypes.STRING,
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
  permalink: { field: 'PERMALINK', allowNull: true, type: DataTypes.STRING },
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
      return JSON.parse(this.getDataValue('variations'));
    },
    set(value) {
      this.setDataValue('variations', JSON.stringify(value));
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
};
class ProductWeb extends Model {
  static associate(models) {
    // this.belongsTo(models.Product, { as: 'prod' });
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'prod_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_WEB_TABLE,
      modelName: 'ProductWeb',
      timestamps: false,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { PRODUCT_WEB_TABLE, ProductWebSchema, ProductWeb };
