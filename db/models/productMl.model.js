const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_ML_TABLE = 'products_ml';

const ProductMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  prod_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  seller_custom_field: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
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
  listing_type_id: { allowNull: false, type: DataTypes.STRING },
  permalink: { allowNull: false, type: DataTypes.STRING },
  start_time: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  variations: {
    type: DataTypes.JSON,
    allowNull: true,
    // type: DataTypes.TEXT,
    // allowNull: true,
    // defaultValue: '[]',
    // get() {
    //   return JSON.parse(this.getDataValue('variations'));
    // },
    // set(value) {
    //   this.setDataValue('variations', JSON.stringify(value));
    // },
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
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    };
  }
}
module.exports = { PRODUCT_ML_TABLE, ProductMlSchema, ProductMl };
