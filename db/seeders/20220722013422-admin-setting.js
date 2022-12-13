'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'settings',
      [
        {
          user_id: 21,
          setting: JSON.stringify({
            status: '',
            listing_type_id: '',
            condition: '',
            hintSku: false,
            pictures: [],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('settings', 21, {});
  },
};
