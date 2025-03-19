import { getErrorMessage } from "../utils/error-message";
import Logger from "../utils/logger";
import { advocateData } from "./mock/advocates";
import { advocates } from "./schema";
import { db, endConnection } from "./setup";

const seedDatabase = async () => {
  try {
    for (const user of advocateData) {
      await db.insert(advocates).values(user);
    }

    Logger.success("Database seeded successfully!");
  } catch (error) {
    Logger.error(`Error seeding database: ${getErrorMessage(error)}`);
  } finally {
    endConnection();
  }
};

seedDatabase();
