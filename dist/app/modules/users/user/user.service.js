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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const getRelativeFilePath_1 = require("../../../middleware/fileUpload/getRelativeFilePath");
const getExpiryTime_1 = __importDefault(require("../../../utils/helper/getExpiryTime"));
const getHashedPassword_1 = __importDefault(require("../../../utils/helper/getHashedPassword"));
const getOtp_1 = __importDefault(require("../../../utils/helper/getOtp"));
const sendEmail_1 = require("../../../utils/sendEmail");
const userProfile_model_1 = require("../userProfile/userProfile.model");
const user_model_1 = __importDefault(require("./user.model"));
const adminProfile_model_1 = require("../adminProfile/adminProfile.model");
const removeFalsyField_1 = require("../../../utils/helper/removeFalsyField");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, getHashedPassword_1.default)(data.password);
    const otp = (0, getOtp_1.default)(4);
    const expDate = (0, getExpiryTime_1.default)(10);
    //user data
    const userData = {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        authentication: { otp, expDate },
    };
    const createdUser = yield user_model_1.default.create(userData);
    //user profile data
    const userProfileData = {
        fullName: data.fullName,
        email: createdUser.email,
        user: createdUser._id,
        phone: data.phone,
        image: data.image,
        position: data.position,
    };
    yield userProfile_model_1.UserProfile.create(userProfileData);
    yield (0, sendEmail_1.sendEmail)(data.email, "Email Verification Code", `Your code is: ${otp}`);
    return { email: createdUser.email, isVerified: createdUser.isVerified };
});
const updateProfileImage = (path, email) => __awaiter(void 0, void 0, void 0, function* () {
    const image = (0, getRelativeFilePath_1.getRelativePath)(path);
    const user = yield user_model_1.default.findOne({ email: email.toLowerCase() });
    let updated;
    if ((user === null || user === void 0 ? void 0 : user.role) === "USER") {
        updated = yield userProfile_model_1.UserProfile.findOneAndUpdate({ email: email.toLowerCase() }, { image }, { new: true });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === "ADMIN") {
        updated = yield adminProfile_model_1.AdminProfile.findOneAndUpdate({ email: email.toLowerCase() }, { image }, { new: true });
    }
    if (!updated) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update image.");
    }
    return updated;
});
const updateProfileData = (userdata, email) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, removeFalsyField_1.removeFalsyFields)(userdata);
    const user = yield user_model_1.default.findOne({ email: email.toLowerCase() });
    let updated;
    if ((user === null || user === void 0 ? void 0 : user.role) === "ADMIN") {
        updated = yield adminProfile_model_1.AdminProfile.findOneAndUpdate({ email: email.toLowerCase() }, data, {
            new: true,
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === "USER" || (user === null || user === void 0 ? void 0 : user.role) === "LEADER") {
        updated = yield userProfile_model_1.UserProfile.findOneAndUpdate({ email: email.toLowerCase() }, data, {
            new: true,
        });
    }
    if (!updated) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update user info.");
    }
    return updated;
});
const updateUserRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOneAndUpdate({ email: data.email.toLowerCase() }, { role: data.role }, { new: true });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return isExist;
});
exports.UserService = {
    createUser,
    updateProfileImage,
    updateProfileData,
    updateUserRole,
};
