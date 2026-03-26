'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authentications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      accept: Sequelize.TEXT,
      accept_encoding: Sequelize.STRING,
      accept_language: Sequelize.STRING,
      connection: Sequelize.STRING,
      cookie: Sequelize.TEXT,
      host: Sequelize.STRING,
      referer: Sequelize.TEXT,

      sec_ch_ua: Sequelize.STRING,
      sec_ch_ua_mobile: Sequelize.STRING,
      sec_ch_ua_platform: Sequelize.STRING,
      sec_fetch_dest: Sequelize.STRING,
      sec_fetch_mode: Sequelize.STRING,
      sec_fetch_site: Sequelize.STRING,

      user_agent: Sequelize.TEXT,

      x_forwarded_for: Sequelize.STRING,
      x_forwarded_host: Sequelize.STRING,
      x_forwarded_port: Sequelize.STRING,
      x_forwarded_proto: Sequelize.STRING,

      geo_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      geo_error: Sequelize.TEXT,
      geo_accuracy: Sequelize.TEXT,
      geo_latitude: Sequelize.TEXT,
      geo_longitude: Sequelize.TEXT,
      geo_timestamp: Sequelize.TEXT,

      session: { type: Sequelize.STRING, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: true },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addConstraint("logs", {
      fields: ["geo_status"],
      type: "check",
      name: "logs_geo_status_check",
      where: {
        geo_status: [
          "granted",
          "denied",
          "prompt",
          "unsupported",
          "error",
        ],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authentications');
  }
};
