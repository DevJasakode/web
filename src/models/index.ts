import 'server-only'
import { Sequelize, Options } from 'sequelize'
import configAll from "../../config/config.json"

import UserFactory from './User';
import AuthenticationFactory from "./Authentication";
import DtpKpuFactory from './DtpKpu';
import ContactInboxFactory from './ContactInbox';
import DocsFactory from './Docs';
import AboutTeamFactory from './AboutTeam';
import AboutTeamSocialMediaFactory from './AboutTeamSocialMedia';
import ContactSettingFactory from './ContactSettings';



const env = process.env.NODE_ENV || 'development'
const config = configAll[env] as Options

const globalForSequelize = globalThis as unknown as {
  sequelize?: Sequelize
}

export const sequelize = globalForSequelize.sequelize ?? new Sequelize(config);

if (process.env.NODE_ENV !== 'production') {
  globalForSequelize.sequelize = sequelize
}


class Lib {
  /**
   * Ambil semua nama tabel yang ada di database
   */
  static async tables(): Promise<string[]> {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();

    // Sequelize bisa return string[] atau object[]
    return tables.map((t: any) =>
      typeof t === "string" ? t : t.tableName
    );
  }

  /**
   * Cek apakah tabel ada
   */
  static async hasTable(
    tableName: string
  ): Promise<boolean> {
    const tables = await this.tables();
    return tables.includes(tableName);
  }

  /**
   * Ambil semua nama model yang terdaftar
   */
  static modelNames(models: Record<string, any>): string[] {
    return Object.keys(models);
  }

  /**
   * Ambil mapping model → nama tabel
   */
  static modelTableMap(models: Record<string, any>): Record<string, string> {
    const map: Record<string, string> = {};

    for (const [name, model] of Object.entries(models)) {
      if (model.getTableName) {
        map[name] = model.getTableName();
      }
    }

    return map;
  }

  /**
   * Sinkronisasi ringan (cek koneksi + info)
   */
  static async healthCheck() {
    await sequelize.authenticate();
    return {
      dialect: sequelize.getDialect(),
      database: sequelize.getDatabaseName(),
      pool: sequelize.config.pool,
    };
  }
}


export const models = {
  Lib: Lib,
  User: UserFactory(sequelize),
  Authentication: AuthenticationFactory(sequelize),
  DtpKpu: DtpKpuFactory(sequelize),
  Docs: DocsFactory(sequelize),

  AboutTeam: AboutTeamFactory(sequelize),
  AboutTeamSocialMedia: AboutTeamSocialMediaFactory(sequelize),

  ContactInbox: ContactInboxFactory(sequelize),
  ContactSetting: ContactSettingFactory(sequelize),
};

// jalankan associate SETELAH semua model ada
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models)
  }
});

export default models;
