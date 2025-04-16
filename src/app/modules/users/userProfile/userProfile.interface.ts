import { Types } from "mongoose";

export interface IUserProfile {
  fullName: string;
  nickName: string;
  position?: string;
  dateOfBirth?: Date;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  user: Types.ObjectId;
}
