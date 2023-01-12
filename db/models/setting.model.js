const { Model, DataTypes, Sequelize } = require('sequelize');

const SETTING_TABLE = 'SETTINGS';

const SettingSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  setting: {
    field: 'SETTING',
    allowNull: false,
    type: DataTypes.JSON,
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

class Setting extends Model {
  // static associate(models) {
  //   // this.belongsTo(models.User, { as: 'user' });
  //   this.belongsTo(models.User, {
  //     foreignKey: 'user_id',
  //   });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SETTING_TABLE,
      modelName: 'Setting',
      timestamps: false,
    };
  }
}

module.exports = { Setting, SettingSchema, SETTING_TABLE };
