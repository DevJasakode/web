'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('about_teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { allowNull: false, type: Sequelize.STRING },
      avatar: { allowNull: true, type: Sequelize.STRING },
      position: { allowNull: false, type: Sequelize.STRING },
      position_desc: { allowNull: false, type: Sequelize.STRING },
      profile: { allowNull: true, type: Sequelize.STRING },
      focus: { allowNull: true, type: Sequelize.STRING },

      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      created_by: { allowNull: false, type: Sequelize.INTEGER },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      updated_by: { allowNull: true, type: Sequelize.INTEGER },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
      deleted_by: { allowNull: true, type: Sequelize.INTEGER },
    })

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('about_teams')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};