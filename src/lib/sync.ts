import { sequelize } from "./db";
import "@/models/User";

export async function syncDB() {
  await sequelize.sync();
}
