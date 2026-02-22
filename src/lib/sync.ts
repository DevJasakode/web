import { Sequelize, Options } from "sequelize";
import rawConfig from "../../config/config.json";
import "@/models/User";


const config = rawConfig.development as Options;

export const sequelize = new Sequelize(config);

export async function syncDB() {
  await sequelize.sync();
}
