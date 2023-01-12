'use strict';
const bcrypt = require('bcrypt');
const { config } = require('./../../config/config');

module.exports = {
  async up(queryInterface) {
    const passHash = await bcrypt.hash(config.superadminPass, 10);
    return queryInterface.bulkInsert(
      'USERS',
      [
        {
          EMAIL: 'admin@labranzas.com',
          PASSWORD: passHash,
          ROLE: 'superadmin',
          CREATED_AT: new Date(),
          UPDATED_AT: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
