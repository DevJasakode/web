'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      desc: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.literal("(strftime('%s','now'))")
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article_tags');
  }
};
