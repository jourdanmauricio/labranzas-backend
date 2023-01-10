const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'CATEGORIES';

const CategorySchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING(20),
  },
  name: {
    field: 'NAME',
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  full_name: {
    field: 'FULL_NAME',
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  path_from_root: {
    field: 'PATH_FROM_ROOT',
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('path_from_root'));
    },
    set(value) {
      this.setDataValue('path_from_root', JSON.stringify(value));
    },
  },
  picture: {
    field: 'PICTURE',
    type: DataTypes.STRING,
    allowNull: true,
  },
  settings: {
    field: 'SETTINGS',
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('settings'));
    },
    set(value) {
      this.setDataValue('settings', JSON.stringify(value));
    },
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
  attributes_details: {
    field: 'ATTRIBUTES_DETAILS',
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('attributes_details'));
    },
    set(value) {
      this.setDataValue('attributes_details', JSON.stringify(value));
    },
  },
  description_web: {
    field: 'DESCRIPTION_WEB',
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    field: 'CREATED_AT',
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    field: 'UPDATED_AT',
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
