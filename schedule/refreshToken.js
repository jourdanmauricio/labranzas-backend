const CronJob = require('node-cron');
const { config } = require('../config/config');
const UserMlService = require('../services/userMl.service');
const axios = require('axios');
const service = new UserMlService();

class Main {
  static async postRefreshToken() {
    const mlUser = await service.findOne();
    const refreshToken = await axios.post(
      `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${config.mlAppId}&client_secret=${config.mlSecret}&refresh_token=${mlUser.refresh_token}`
    );

    refreshToken.id = refreshToken.user_id;
    delete refreshToken.user_id;
    await service.update(refreshToken.id, refreshToken.data);
  }
}

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule('*/30 */5 * * *', async () => {
    // */30 */5 * * *  //Cada 5 hs 30 min. https://crontab.guru/#*/30_*/5_*_*_*
    console.log('Refresh Token');
    // Add your custom logic here
    Main.postRefreshToken();
  });

  scheduledJobFunction.start();
};
