'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dtp_kpus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      id_prov: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      id_kota: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      id_kecamatan: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      id_kelurahan: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      provinsi: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      kabupaten: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      kecamatan: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      kelurahan: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tps_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      no_kk: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      no_nik: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nama: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tempat_lahir: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tanggal_lahir: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      usia: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      jns_kelamin: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      alamat: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      disabilitas: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      lup: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dtp_kpus');
  },
};