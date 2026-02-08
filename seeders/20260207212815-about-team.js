'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("about_teams", [
      {
        id: 1,
        name: "Antonius Sinaga",
        avatar: "/assets/image/Frame 1 3.png",
        position: "Owner",
        position_desc: "CEO & Co-Founder. Fokus pada visi bisnis dan pertumbuhan strategis.",
        profile: "antoniussinaga",
        focus: "Team Work, Leadership",
        created_at: new Date(),
        created_by: 1,
      }
    ]);

    await queryInterface.bulkInsert("about_team_social_media", [
      {
        about_team_id: 1,
        platform: "Google",
        platform_logo: "",
        platform_url: "https://www.google.com",
        url: "https://google.com/@antoniussinaga",
        created_at: new Date(),
        created_by: 1,
      }
    ]);


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'about_teams',
      {
        id: [1],
      },
      {}
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
