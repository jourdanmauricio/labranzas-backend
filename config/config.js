require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbConnectString: process.env.DB_CONNECT,

  // dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,
  // jwtSecret: process.env.JWT_SECRET,

  // adminEmail: process.env.ADMIN_EMAIL,
  // adminPass: process.env.ADMIN_PASS,
  // adminRole: process.env.ADMIN_ROLE,
  // superadminEmail: process.env.SUPERADMIN_EMAIL,
  // superadminPass: process.env.SUPERADMIN_PASS,
  // superadminRole: process.env.SUPERADMIN_ROLE,

  // domain: process.env.DOMAIN,

  // emailSend: process.env.EMAIL_SEND,
  // emailSendPass: process.env.EMAIL_SEND_PASS,
  // emailTo: process.env.EMAIL_TO,
};

module.exports = { config };
