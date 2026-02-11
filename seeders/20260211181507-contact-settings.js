'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'contact_settings',
      [
        {
          id: 1,
          address: "Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan 32383",
          phone: "+62 851 5900 3374",
          email: "info@jasakode.com",
          auto_reply_email: true,
          auto_reply_email_message: "Terima kasih telah menghubungi kami. Pesan Anda telah diterima dan akan kami balas secepat mungkin.",
          forward_telegram_bot: true,
          forward_telegram_bot_token: "",
          forward_whatsapp: true,
          forward_whatsapp_contact: "+62 851 5900 3374",
          created_at: new Date(),
          created_by: 1,
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "contact_inboxs",
      [
        {
          id: 1,
          ip: "127.0.0.1",
          hash: "abc",
          name: "Antonius",
          email: "antonius@jasakode.com",
          phone: "08123456789",
          company: "PT Halal Haram Hantam",
          message: "Hai, Apakah kita bisa bekerja sama.",
          unread: true,
          created_at: new Date(),
        },
        {
          id: 2,
          ip: "36.77.210.15",
          hash: "def456",
          name: "Siti Rahma",
          email: "siti.rahma@gmail.com",
          phone: "082198765432",
          company: "CV Digital Nusantara",
          message: "Halo, saya tertarik dengan layanan pembuatan website company profile.",
          unread: true,
          created_at: new Date(),
        },
        {
          id: 3,
          ip: "114.125.88.201",
          hash: "ghi789",
          name: "Michael Tan",
          email: "michael.tan@startup.io",
          phone: "081355566677",
          company: "Startup Teknologi Maju",
          message: "Apakah tersedia paket pengembangan aplikasi mobile untuk MVP?",
          unread: false,
          created_at: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'contact_settings',
      {
        id: { [Op.in]: [1] }
      },
      {}
    );
    await queryInterface.bulkDelete(
      'contact_inboxs',
      {
        id: { [Op.in]: [1, 2, 3] }
      },
      {}
    );
  }
};
