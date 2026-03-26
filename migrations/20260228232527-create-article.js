'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },

      content_html: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content_text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rich_text_editor: {
        allowNull: false,
        type: Sequelize.STRING
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
    });

    await queryInterface.createTable('article_media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mime_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alt_text: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.literal("(strftime('%s','now'))")
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });

    // await queryInterface.createTable('article_comments', {

    // });
    // await queryInterface.createTable('article_like', {

    // });
    // await queryInterface.createTable('article_dislike', {

    // });
    // await queryInterface.createTable('article_share', {

    // });


    // Associates
    await queryInterface.createTable('pivot_article_media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      media_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'article_media',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
        // contoh value: 'poster', 'gallery', 'thumbnail'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.literal("(strftime('%s','now'))")
      }
    });

    await queryInterface.createTable('pivot_article_categories', {
      article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable('pivot_article_tags', {
      article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');

    await queryInterface.dropTable('article_media');
    // await queryInterface.dropTable('article_comments');
    // await queryInterface.dropTable('article_like');
    // await queryInterface.dropTable('article_dislike');
    // await queryInterface.dropTable('article_share');
  }
};
