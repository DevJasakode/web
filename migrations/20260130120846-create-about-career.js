'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('about_careers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: { allowNull: false, type: Sequelize.STRING },
      position: { allowNull: false, type: Sequelize.STRING },
      work_desc: { allowNull: true, type: Sequelize.STRING },
      work_mode: { allowNull: false, type: Sequelize.STRING },
      employment_type: { allowNull: false, type: Sequelize.STRING },
      location: { allowNull: true, type: Sequelize.STRING },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: { allowNull: false, type: Sequelize.INTEGER },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      updated_by: { allowNull: true, type: Sequelize.INTEGER },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
      deleted_by: { allowNull: true, type: Sequelize.INTEGER },
    });

    await queryInterface.addConstraint("about_careers", {
      fields: ["employment_type"],
      type: "check",
      name: "employment_type_check",
      where: {
        employment_type: [
          "full-time",
          "part-time",
          "contract",
          "internship",
        ],
      },
    });

    await queryInterface.addConstraint("about_careers", {
      fields: ["work_mode"],
      type: "check",
      name: "work_mode_check",
      where: {
        work_mode: [
          "remote",
          "onsite",
          "hybrid",
        ],
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('about_careers');
  }
};
