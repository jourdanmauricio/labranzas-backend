const { models } = require('../libs/sequelize');

class SettingService {
  constructor() {}

  async find() {
    const rta = await models.Setting.findOne();
    return rta;
  }

  async createSettings(data) {
    const rta = await models.Setting.create(data);
    return rta;
  }

  async updateSettings(setting) {
    const userSetting = await models.Setting.findOne();
    const newSettings = { ...userSetting, ...setting };
    const rta = await userSetting.update(newSettings);
    return rta;
  }
}

module.exports = SettingService;
