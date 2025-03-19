import { MigrationConfig } from "drizzle-orm/migrator";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getErrorMessage } from "../utils/error-message";
import Logger from "../utils/logger";
import { db } from "./setup";

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const migrationConfig: MigrationConfig = {
    migrationsFolder: "drizzle",
  };

  await migrate(db, migrationConfig);
};

runMigration()
  .then(() => {
    Logger.success("Successfully ran migration.");
    process.exit(0);
  })
  .catch((e) => {
    Logger.error(`Failed to run migration. ${getErrorMessage(e)}`);
    process.exit(1);
  });
