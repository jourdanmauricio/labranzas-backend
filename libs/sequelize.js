const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//
// const options = {
//   dialect: "postgres",
//   logging: config.isProd ? false : console.log,
// };
//
// if (config.isProd) {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }
//
// const sequelize = new Sequelize(URI, options);
//

const sequelize = new Sequelize({
  dialect: 'oracle',
  username: config.dbUser,
  logging: config.isProd ? false : console.log,
  password: config.dbPassword,
  dialectOptions: { connectString: config.dbConnectString },
});

setupModels(sequelize);

module.exports = sequelize;
