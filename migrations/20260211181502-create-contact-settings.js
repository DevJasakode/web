'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: { allowNull: false, type: Sequelize.STRING },
      phone: { allowNull: false, type: Sequelize.STRING },
      email: { allowNull: false, type: Sequelize.STRING },
      auto_reply_email: { allowNull: false, type: Sequelize.BOOLEAN },
      auto_reply_email_message: { allowNull: false, type: Sequelize.STRING },
      forward_telegram_bot: { allowNull: false, type: Sequelize.BOOLEAN },
      forward_telegram_bot_token: { allowNull: true, type: Sequelize.STRING },
      forward_whatsapp: { allowNull: false, type: Sequelize.BOOLEAN },
      forward_whatsapp_contact: { allowNull: true, type: Sequelize.STRING },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      updated_by: { allowNull: true, type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contact_settings');
  }
};
