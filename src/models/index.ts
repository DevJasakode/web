// import 'server-only'
// import { Sequelize, Options } from 'sequelize'
// import configAll from "../../config/config.json"

// import UserFactory from './User';
// import AuthenticationFactory from "./Authentication";
// import DtpKpuFactory from './DtpKpu';
// import ContactInboxFactory from './ContactInbox';
// import DocsFactory from './Docs';
// import AboutTeamFactory from './AboutTeam';
// import AboutTeamSocialMediaFactory from './AboutTeamSocialMedia';
// import ContactSettingFactory from './ContactSettings';
// import StorageFactory from "./StorageFactory";
// import StorageMetaFactory from "./StorageMetaFactory";
// import StorageAccessTokenFactory from "./StorageAccessTokenFactory";



// const env = process.env.NODE_ENV || 'development'
// const config = configAll[env] as Options

// const globalForSequelize = globalThis as unknown as {
//   sequelize?: Sequelize
// }

// export const sequelize = globalForSequelize.sequelize ?? new Sequelize(config);

// if (process.env.NODE_ENV !== 'production') {
//   globalForSequelize.sequelize = sequelize
// }


// class Lib {
//   /**
//    * Ambil semua nama tabel yang ada di database
//    */
//   static async tables(): Promise<string[]> {
//     const queryInterface = sequelize.getQueryInterface();
//     const tables = await queryInterface.showAllTables();

//     // Sequelize bisa return string[] atau object[]
//     return tables.map((t: any) =>
//       typeof t === "string" ? t : t.tableName
//     );
//   }

//   /**
//    * Cek apakah tabel ada
//    */
//   static async hasTable(
//     tableName: string
//   ): Promise<boolean> {
//     const tables = await this.tables();
//     return tables.includes(tableName);
//   }

//   /**
//    * Ambil semua nama model yang terdaftar
//    */
//   static modelNames(models: Record<string, any>): string[] {
//     return Object.keys(models);
//   }

//   /**
//    * Ambil mapping model → nama tabel
//    */
//   static modelTableMap(models: Record<string, any>): Record<string, string> {
//     const map: Record<string, string> = {};

//     for (const [name, model] of Object.entries(models)) {
//       if (model.getTableName) {
//         map[name] = model.getTableName();
//       }
//     }

//     return map;
//   }

//   /**
//    * Sinkronisasi ringan (cek koneksi + info)
//    */
//   static async healthCheck() {
//     await sequelize.authenticate();
//     return {
//       dialect: sequelize.getDialect(),
//       database: sequelize.getDatabaseName(),
//       pool: sequelize.config.pool,
//     };
//   }
// }

// export const models = {
//   Lib: Lib,
//   User: UserFactory(sequelize),
//   Authentication: AuthenticationFactory(sequelize),
//   DtpKpu: DtpKpuFactory(sequelize),
//   Docs: DocsFactory(sequelize),

//   AboutTeam: AboutTeamFactory(sequelize),
//   AboutTeamSocialMedia: AboutTeamSocialMediaFactory(sequelize),

//   ContactInbox: ContactInboxFactory(sequelize),
//   ContactSetting: ContactSettingFactory(sequelize),

//   Storage: StorageFactory(sequelize),
//   StorageMeta: StorageMetaFactory(sequelize),
//   StorageAccessToken: StorageAccessTokenFactory(sequelize),
// };

// // jalankan associate SETELAH semua model ada
// Object.values(models).forEach((model: any) => {
//   if (model.associate) {
//     model.associate(models)
//   }
// });



// export default models;


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
import StorageFactory from "./StorageFactory";
import StorageMetaFactory from "./StorageMetaFactory";
import StorageAccessTokenFactory from "./StorageAccessTokenFactory";

const env = process.env.NODE_ENV || 'development'
const config = configAll[env] as Options

const globalForSequelize = globalThis as unknown as {
  sequelize?: Sequelize
}

export const sequelize =
  globalForSequelize.sequelize ?? new Sequelize(config);

if (process.env.NODE_ENV !== 'production') {
  globalForSequelize.sequelize = sequelize
}

/* ===========================
   Utility Class
=========================== */

class Lib {
  static async tables(): Promise<string[]> {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();

    return tables.map((t: any) =>
      typeof t === "string" ? t : t.tableName
    );
  }

  static async hasTable(tableName: string): Promise<boolean> {
    const tables = await this.tables();
    return tables.includes(tableName);
  }

  static modelNames(models: Record<string, any>): string[] {
    return Object.keys(models);
  }

  static modelTableMap(models: Record<string, any>): Record<string, string> {
    const map: Record<string, string> = {};

    for (const [name, model] of Object.entries(models)) {
      if (model.getTableName) {
        map[name] = model.getTableName();
      }
    }

    return map;
  }

  static async healthCheck() {
    await sequelize.authenticate();
    return {
      dialect: sequelize.getDialect(),
      database: sequelize.getDatabaseName(),
      pool: sequelize.config.pool,
    };
  }
}

/* ===========================
   Initialize All Models
=========================== */

// Core models
const User = UserFactory(sequelize);
const Authentication = AuthenticationFactory(sequelize);
const DtpKpu = DtpKpuFactory(sequelize);
const Docs = DocsFactory(sequelize);

const AboutTeam = AboutTeamFactory(sequelize);
const AboutTeamSocialMedia = AboutTeamSocialMediaFactory(sequelize);

const ContactInbox = ContactInboxFactory(sequelize);
const ContactSetting = ContactSettingFactory(sequelize);

// Storage ecosystem
const Storage = StorageFactory(sequelize);
const StorageMeta = StorageMetaFactory(sequelize);
const StorageAccessToken = StorageAccessTokenFactory(sequelize);

/* ===========================
   Associations
=========================== */

// Storage → Meta
Storage.hasMany(StorageMeta, {
  foreignKey: "storage_id",
  as: "meta",
});

StorageMeta.belongsTo(Storage, {
  foreignKey: "storage_id",
});

// Storage → Access Token
Storage.hasMany(StorageAccessToken, {
  foreignKey: "storage_id",
  as: "access_tokens",
});

StorageAccessToken.belongsTo(Storage, {
  foreignKey: "storage_id",
});

/* ===========================
   Model Registry
=========================== */

export const models = {
  Lib,

  User,
  Authentication,
  DtpKpu,
  Docs,

  AboutTeam,
  AboutTeamSocialMedia,

  ContactInbox,
  ContactSetting,

  Storage,
  StorageMeta,
  StorageAccessToken,
};

/* ===========================
   Optional associate() Support
=========================== */

Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;