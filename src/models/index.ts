import 'server-only'
import { Sequelize, Options } from 'sequelize'
import configAll from "../../config/config.json"

import UserFactory, { User as UserModel } from './User';
import AuthenticationFactory, { Authentication as AuthenticationModel } from "./Authentication";
import DtpKpuFactory from './DtpKpu';
import ContactInboxFactory from './ContactInbox';
import DocsFactory from './Docs';
import AboutTeamFactory from './AboutTeam';
import AboutTeamSocialMediaFactory from './AboutTeamSocialMedia';
import ContactSettingFactory from './ContactSettings';
import StorageFactory from "./StorageFactory";
import StorageMetaFactory from "./StorageMetaFactory";
import StorageAccessTokenFactory from "./StorageAccessTokenFactory";

// Article
import ArticleCategoriesFactory from './ArticleCategories';

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
};


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

// Article
const ArticleCategories = ArticleCategoriesFactory(sequelize);

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
   Auth Class
=========================== */

class Auth {
  static async getUser(token: string): Promise<UserModel | null> {
    const auth = await Authentication.findOne({
      where: {
        session: token,
      },
      include: [
        {
          model: UserModel,
          as: "user",
        },
      ],
    });
    return auth?.user || null;
  };

  static async getAuth(token: string): Promise<AuthenticationModel | null> {
    const auth = await Authentication.findOne({
      where: {
        session: token,
      },
      include: [
        {
          model: UserModel,
          as: "user",
        },
      ],
    });
    return auth;
  };

};

/* ===========================
   Model Registry
=========================== */

export const models = {
  Lib,
  Auth,

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

  ArticleCategories,
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