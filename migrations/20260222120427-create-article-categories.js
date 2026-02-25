'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      logo: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },

      parent_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'article_categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.literal("(strftime('%s','now'))"),
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
    });

    // index untuk performa tree query
    await queryInterface.addIndex('article_categories', ['parent_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article_categories');
  }
};