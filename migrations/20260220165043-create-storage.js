'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('storages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      private: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      prefix: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER, // size file in bytes
      },
      content_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updated_at: { allowNull: true, type: Sequelize.DATE },
      updated_by: { allowNull: true, type: Sequelize.INTEGER },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
      deleted_by: { allowNull: true, type: Sequelize.INTEGER },
    });

    await queryInterface.createTable('storage_meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storage_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'storages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });

    await queryInterface.createTable('storage_access_token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      storage_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'storages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      value: {
        allowNull: false,
        type: Sequelize.TEXT
      },

      expires_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // unix timestamp (seconds)
      },

      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.literal("(strftime('%s','now'))")
      }
    });

  //   await queryInterface.addConstraint('storages', {
  //     fields: ['prefix'],
  //     type: 'check',
  //     name: 'storages_prefix_valid_path_check',
  //     where: Sequelize.literal(`
  //   prefix LIKE '/storage%' 
  //   AND instr(prefix, '..') = 0
  //   AND instr(prefix, '//') = 0
  //   AND (
  //     prefix = '/storage'
  //     OR substr(prefix, -1) != '/'
  //   )
  // `)
  //   });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('storages');
  }
};
