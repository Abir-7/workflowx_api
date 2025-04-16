/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { appConfig } from "../config";
import { userRoles } from "../interface/auth.interface";
import { AdminProfile } from "../modules/users/adminProfile/adminProfile.model";
import User from "../modules/users/user/user.model";
import logger from "../utils/logger";
import getHashedPassword from "../utils/helper/getHashedPassword";

const seedAdmin = async (): Promise<void> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingAdmin = await User.findOne({ role: userRoles.ADMIN }).session(
      session
    );
    if (existingAdmin) {
      logger.info("✅ Super Admin already exists. Skipping seeding.");
      await session.abortTransaction();
      return;
    }
    const hashedPassword = await getHashedPassword(
      appConfig.admin.password as string
    );
    const createdUsers = await User.create(
      [
        {
          role: userRoles.ADMIN,
          email: appConfig.admin.email,
          password: hashedPassword,
          isVerified: true,
        },
      ],
      { session }
    );

    const superAdminUser = createdUsers[0];

    await AdminProfile.create(
      [
        {
          fullName: "Admin-1",
          email: appConfig.admin.email,
          user: superAdminUser._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    logger.info("✅ Super Admin seeded successfully.");
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    logger.error("❌ Seeding Super Admin failed:", error);
    throw error;
  }
};

export default seedAdmin;
