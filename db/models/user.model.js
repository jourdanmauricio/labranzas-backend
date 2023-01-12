const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const USER_TABLE = 'USERS';

const UserSchema = {
  id: {
    field: 'ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    field: 'EMAIL',
    allowNull: false,
    type: DataTypes.STRING(150),
    unique: true,
  },
  password: {
    field: 'PASSWORD',
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  recovery_token: {
    field: 'RECOVERY_TOKEN',
    allowNull: true,
    type: DataTypes.STRING(150),
  },
  role: {
    field: 'ROLE',
    allowNull: false,
    type: DataTypes.STRING(20),
    defaultValue: 'customer',
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

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'user_id' });
    this.hasMany(models.Address, { as: 'addresses', foreignKey: 'user_id' });
    // this.hasOne(models.UserMl, { as: 'userMl', foreignKey: 'user_id' });
    // this.hasOne(models.Setting, { as: 'setting', foreignKey: 'user_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      },
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
