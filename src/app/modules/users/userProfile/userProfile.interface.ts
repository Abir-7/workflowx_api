import { Types } from "mongoose";

export interface IUserProfile {
  fullName: string;
  nickName: string;
  position: PositionType;
  dateOfBirth?: Date;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  user: Types.ObjectId;
}

export enum Position {
  BACKEND_DJANGO = "Backend (Django)",
  BACKEND_NODE = "Backend (Node.js)",
  FRONTEND_REACT = "Frontend (React)",
  FRONTEND_VUE = "Frontend (Vue.js)",
  BACKEND_LARAVEL = "Backend (Laravel)",
  UI_UX_DESIGNER = "UI/UX Designer",
  AI_DEVELOPER = "AI Developer",
  REACT_NATIVE = "React Native Developer",
  FLUTTER = "Flutter Developer",
}

export type PositionType = `${Position}`;
