const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_WEB_TABLE = 'products_web';

const ProductWebSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  prod_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  seller_custom_field: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  available_quantity: { type: DataTypes.INTEGER(6), allowNull: false },
  sold_quantity: { type: DataTypes.INTEGER(6), allowNull: false },
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
    // type: DataTypes.JSON,
    // allowNull: true,
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
};
class ProductWeb extends Model {
  static associate(models) {
    // this.belongsTo(models.Product, { as: 'prod' });
    this.belongsTo(models.Product, {
      foreignKey: 'prod_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_WEB_TABLE,
      modelName: 'ProductWeb',
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    };
  }
}
module.exports = { PRODUCT_WEB_TABLE, ProductWebSchema, ProductWeb };
