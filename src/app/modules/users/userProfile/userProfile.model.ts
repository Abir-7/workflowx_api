import { Schema, model } from "mongoose";
import { IUserProfile, Position } from "./userProfile.interface";

const userProfileSchema = new Schema<IUserProfile>({
  fullName: { type: String },
  position: { type: String, enum: Object.values(Position) },
  nickName: { type: String },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true },
  phone: { type: String },
  address: { type: String },
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

export const UserProfile = model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);
