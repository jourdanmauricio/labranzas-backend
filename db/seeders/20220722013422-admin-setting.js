'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'settings',
      [
        {
          // user_id: 21,
          setting: JSON.stringify({
            contact: {
              facebook: '',
              twitter: '',
              instagram: '',
              youtube: '',
              whatsapp: '',
              email: '',
              phone: '',
              address: '',
            },
            content: {
              logo: '',
            },
            colors: {
              title_color: '',
              paragraph_color: '',
              button_color: '',
              divisor_color: '',
              effect_color: '',
              error_color: '',
              h1_color: '',
              paragraph_header_color: '',
              background_color: '',
              background_footer_color: '',
            },
            texts: {
              h1_font_size: '',
              h1_font_weight: '',
              paragraph_font_size: '',
              paragraph_font_weight: '',
              paragraph_header_size: '',
              paragraph_header_weight: '',
              title_font_size: '',
              title_font_weight: '',
            },
            products: {
              status: '',
              listing_type_id: '',
              condition: '',
              hintSku: false,
              pictures: [],
            },
            ml: {
              user_id: null,
              nickname: '',
              access_token: '',
              token_type: '',
              expires_in: null,
              scope: '',
              refresh_token: '',
              permalink: '',
              site_id: '',
            },
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
