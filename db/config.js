const { config } = require('./../config/config');

module.exports = {
  development: {
    // url: config.dbUrl,
    // dialect: config.dbEngine,
    dialect: config.dbEngine,
    logging: console.log,
    username: config.dbUser,
    password: config.dbPassword,
    dialectOptions: { connectString: config.dbConnectString },
  },
  production: {
    url: config.dbUrl,
    dialect: config.dbEngine,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
