'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = Date.now();

    await queryInterface.bulkInsert(
      "article_categories",
      [
        // ===== Parent Categories =====
        { id: 1, slug: "technology", name: "Technology", parent_id: null, created_at: now, created_by: 1 },
        { id: 2, slug: "business", name: "Business", parent_id: null, created_at: now, created_by: 1 },
        { id: 3, slug: "science", name: "Science", parent_id: null, created_at: now, created_by: 1 },
        { id: 4, slug: "lifestyle", name: "Lifestyle", parent_id: null, created_at: now, created_by: 1 },
        { id: 5, slug: "education", name: "Education", parent_id: null, created_at: now, created_by: 1 },
        { id: 6, slug: "health", name: "Health", parent_id: null, created_at: now, created_by: 1 },
        { id: 7, slug: "finance", name: "Finance", parent_id: null, created_at: now, created_by: 1 },
        { id: 8, slug: "programming", name: "Programming", parent_id: null, created_at: now, created_by: 1 },
        { id: 9, slug: "design", name: "Design", parent_id: null, created_at: now, created_by: 1 },
        { id: 10, slug: "startup", name: "Startup", parent_id: null, created_at: now, created_by: 1 },

        // ===== Child Categories =====
        { id: 11, slug: "web-development", name: "Web Development", parent_id: 8, created_at: now, created_by: 1 },
        { id: 12, slug: "mobile-development", name: "Mobile Development", parent_id: 8, created_at: now, created_by: 1 },
        { id: 13, slug: "artificial-intelligence", name: "Artificial Intelligence", parent_id: 1, created_at: now, created_by: 1 },
        { id: 14, slug: "cybersecurity", name: "Cybersecurity", parent_id: 1, created_at: now, created_by: 1 },
        { id: 15, slug: "ui-ux", name: "UI/UX", parent_id: 9, created_at: now, created_by: 1 },
        { id: 16, slug: "investing", name: "Investing", parent_id: 7, created_at: now, created_by: 1 },
        { id: 17, slug: "mental-health", name: "Mental Health", parent_id: 6, created_at: now, created_by: 1 },
        { id: 18, slug: "entrepreneurship", name: "Entrepreneurship", parent_id: 10, created_at: now, created_by: 1 },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "article_categories",
      {
        id: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] }
      },
      {}
    );
  }
};