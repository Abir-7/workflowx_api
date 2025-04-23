"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const auth_interface_1 = require("../interface/auth.interface");
const adminProfile_model_1 = require("../modules/users/adminProfile/adminProfile.model");
const user_model_1 = __importDefault(require("../modules/users/user/user.model"));
const logger_1 = __importDefault(require("../utils/logger"));
const getHashedPassword_1 = __importDefault(require("../utils/helper/getHashedPassword"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const existingAdmin = yield user_model_1.default.findOne({ role: auth_interface_1.userRoles.ADMIN }).session(session);
        if (existingAdmin) {
            logger_1.default.info("✅ Super Admin already exists. Skipping seeding.");
            yield session.abortTransaction();
            return;
        }
        const hashedPassword = yield (0, getHashedPassword_1.default)(config_1.appConfig.admin.password);
        const createdUsers = yield user_model_1.default.create([
            {
                role: auth_interface_1.userRoles.ADMIN,
                email: config_1.appConfig.admin.email,
                password: hashedPassword,
                isVerified: true,
            },
        ], { session });
        const superAdminUser = createdUsers[0];
        yield adminProfile_model_1.AdminProfile.create([
            {
                fullName: "Admin-1",
                email: config_1.appConfig.admin.email,
                user: superAdminUser._id,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        logger_1.default.info("✅ Super Admin seeded successfully.");
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        logger_1.default.error("❌ Seeding Super Admin failed:", error);
        throw error;
    }
});
exports.default = seedAdmin;
