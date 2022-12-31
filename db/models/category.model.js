const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING(20),
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  path_from_root: {
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  settings: {
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
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
