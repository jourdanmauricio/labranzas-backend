const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'CUSTOMERS';

const CustomerSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    field: 'NAME',
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  last_name: {
    field: 'LAST_NAME',
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  phone: {
    field: 'PHONE',
    allowNull: true,
    type: DataTypes.STRING,
  },
  document_type: {
    field: 'DOCUMENT_TYPE',
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  document_number: {
    field: 'DOCUMENT_NUMBER',
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  user_id: {
    field: 'USER_ID',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
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
};

class Customer extends Model {
  static associate(models) {
    // this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
    //

    //this.hasMany(models.Order, {
    //  as: 'orders',
    //  foreignKey: 'customerId',
    //});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
