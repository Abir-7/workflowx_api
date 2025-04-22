/* eslint-disable no-console */

import server from "./app";
import { appConfig } from "./app/config";
import mongoose from "mongoose";
import logger from "./app/utils/logger";
import seedAdmin from "./app/DB";

process.on("uncaughtException", (err) => {
  logger.error("🔥 Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("⚠️ Unhandled Promise Rejection: ", err);
  process.exit(1);
});

const main = async () => {
  try {
    await mongoose.connect(appConfig.database.dataBase_uri as string);
    logger.info("✅ MongoDB connected successfully!");

    await seedAdmin();
    logger.info("👤 Admin user seeded successfully!");

    server.listen(
      Number(appConfig.server.port),
      appConfig.server.ip as string,
      () => {
        logger.info(
          `🚀 Server is running at http://${appConfig.server.ip}:${appConfig.server.port}`
        );
      }
    );
  } catch (err) {
    logger.error("❌ Error connecting to MongoDB: ", err);
  }
};

main().catch((err) => logger.error("❌ Unexpected Error: ", err));