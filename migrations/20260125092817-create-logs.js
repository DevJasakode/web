'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable('logs', {
  //     id: {
  //       allowNull: false,
  //       autoIncrement: true,
  //       primaryKey: true,
  //       type: Sequelize.INTEGER,
  //     },

  //     accept: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },

  //     accept_encoding: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     accept_language: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     connection: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     cookie: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },

  //     host: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     referer: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },

  //     sec_ch_ua: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     sec_ch_ua_mobile: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     sec_ch_ua_platform: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     sec_fetch_dest: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     sec_fetch_mode: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     sec_fetch_site: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     user_agent: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },

  //     x_forwarded_for: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     x_forwarded_host: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     x_forwarded_port: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     x_forwarded_proto: {
  //       type: Sequelize.STRING,
  //       allowNull: true,
  //     },

  //     created_at: {
  //       allowNull: false,
  //       type: Sequelize.DATE,
  //       defaultValue: Sequelize.fn('NOW'),
  //     },

  //     updated_at: {
  //       allowNull: false,
  //       type: Sequelize.DATE,
  //       defaultValue: Sequelize.fn('NOW'),
  //     },

  //     geo_status: {
  //       type: Sequelize.STRING,
  //       allowNull: false,
  //       validate: {
  //         isIn: [[
  //           "granted",
  //           "denied",
  //           "prompt",
  //           "unsupported",
  //           "error"
  //         ]]
  //       }
  //     },
  //     geo_error: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },
  //     geo_accuracy: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },
  //     geo_latitude: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },
  //     geo_longitude: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },
  //     geo_timestamp: {
  //       type: Sequelize.TEXT,
  //       allowNull: true,
  //     },
  //   })
  // },

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
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

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
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

  async down(queryInterface) {
    await queryInterface.dropTable('logs')
  },
};



