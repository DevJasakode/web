'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('about_team_social_media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      about_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'about_teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      platform: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      platform_logo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      platform_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_by: { allowNull: false, type: Sequelize.INTEGER },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      updated_by: { allowNull: true, type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('about_team_social_media');
  },
};
