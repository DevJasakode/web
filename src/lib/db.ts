import { Sequelize, Options } from "sequelize";
import rawConfig from "../../config/config.json";

const config = rawConfig.development as Options;

export const sequelize = new Sequelize(config);