require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  frontEnd: process.env.FRONTEND,
  revalidateToken: process.env.REVALIDATE_TOKEN,
  port: process.env.PORT || 3000,
  ////////
  // BD //
  ////////
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbConnectString: process.env.DB_CONNECT,
  dbEngine: process.env.DB_ENGINE,
  // dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,

  /////////
  // JWT //
  /////////
  jwtSecret: process.env.JWT_SECRET,

  ///////////
  // USERS //
  ///////////

  adminEmail: process.env.ADMIN_EMAIL,
  adminPass: process.env.ADMIN_PASS,
  adminRole: process.env.ADMIN_ROLE,
  superadminEmail: process.env.SUPERADMIN_EMAIL,
  superadminPass: process.env.SUPERADMIN_PASS,
  superadminRole: process.env.SUPERADMIN_ROLE,

  domain: process.env.DOMAIN,

  ////////////
  // MAILER //
  ////////////
  mailerEmail: process.env.MAILER_EMAIL,
  mailerPassword: process.env.MAILER_PASSWORD,
  // emailTo: process.env.EMAIL_TO,
  ////////
  // ML //
  ////////
  mlApi: process.env.ML_API,
  mlAppId: process.env.ML_APP_ID,
  mlSecret: process.env.ML_SECRET,
};

module.exports = { config };
