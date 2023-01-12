const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_ML_TABLE = 'USERS_ML';

const UserMlSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nickname: {
    field: 'NICKNAME',
    allowNull: true,
    type: DataTypes.STRING(),
  },
  access_token: {
    field: 'ACCESS_TOKEN',
    allowNull: true,
    type: DataTypes.STRING(),
  },
  token_type: {
    field: 'TOKEN_TYPE',
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  expires_in: {
    field: 'EXPIRES_IN',
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  scope: {
    field: 'SCOPE',
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  refresh_token: {
    field: 'REFRESH_TOKEN',
    allowNull: true,
    type: DataTypes.STRING(),
  },
  permalink: {
    field: 'PERMALINK',
    allowNull: true,
    type: DataTypes.STRING(),
  },
  site_id: {
    field: 'SITE_ID',
    allowNull: true,
    type: DataTypes.STRING(3),
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

class UserMl extends Model {
  // static associate(models) {
  // this.belongsTo(models.User, { as: 'user' });
  // this.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
  // this.belongsTo(models.User, {
  //   foreignKey: 'user_id',
  // });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_ML_TABLE,
      modelName: 'UserMl',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { USER_ML_TABLE, UserMlSchema, UserMl };
