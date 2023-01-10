const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_ML_TABLE = 'PRODUCTS_ML';

const ProductMlSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING,
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
  permalink: { field: 'PERMALINK', allowNull: false, type: DataTypes.STRING },
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
class ProductMl extends Model {
  static associate(models) {
    // this.belongsTo(models.Product, { as: 'prod' });
    this.belongsTo(models.Product, {
      foreignKey: 'prod_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_ML_TABLE,
      modelName: 'ProductMl',
      timestamps: false,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { PRODUCT_ML_TABLE, ProductMlSchema, ProductMl };
