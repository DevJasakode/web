'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@jasakode.com',
          username: "admin",
          avatar: "/assets/image/Frame 1 3.png",
          verified_email: Sequelize.literal("CURRENT_TIMESTAMP"),
          password: await bcrypt.hash("Admin123@", 10),
          created_at: new Date(),
          created_by: 1,
        },
        {
          email: 'alice@example.com',
          username: "alice",
          avatar: "/assets/image/Frame 1 3.png",
          password: await bcrypt.hash("password123", 10),
          created_at: new Date(),
          created_by: 1,
        },
        {
          email: 'bob@example.com',
          username: "bob",
          avatar: "/assets/image/Frame 1 3.png",
          password: await bcrypt.hash("password123", 10),
          created_at: new Date(),
          created_by: 1,
        },
        {
          email: 'charlie@example.com',
          username: "charlie",
          avatar: "/assets/image/Frame 1 3.png",
          password: await bcrypt.hash("password123", 10),
          created_at: new Date(),
          created_by: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      {
        email: [
          'alice@example.com',
          'bob@example.com',
          'charlie@example.com',
        ],
      },
      {}
    );
  },
};