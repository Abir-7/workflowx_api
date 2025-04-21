import { Types } from "mongoose";

export const status = {
  COMPLETED: "COMPLETED",
  ONGOING: "ONGOING",
  CENCELED: "CENCELED",
} as const;
export const projectStatus = Object.values(status);
export type IStatus = keyof typeof status;

export const phaseStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;
export const projectPhaseStatus = Object.values(phaseStatus);
export type IPhaseStatus = keyof typeof phaseStatus;

export const phases = [
  "UI/UX",
  "R&D",
  "API_DEVELOPMENT",
  "API_INTIGRATION",
  "DASHBOARD_DESIGN",
  "DASHBOARD_INTIGRATION",
  "WEBSITE_DESIGN",
  "WEBSITE_DEPLOYMENT",
  "APP_DEPLOYMENT",
  "APP_DESIGN",
] as const;

export interface IProjectPhase {
  _id: string;
  name: TPhase;
  budget: number;
  members: Types.ObjectId[];
  deadline: Date;
  status: IPhaseStatus;
}

export interface IUpdateLog {
  updatedBy: Types.ObjectId;
  date: Date;
  note: string;
}

export interface IProject {
  _id: string;
  name: string;
  clientName: string;
  projectGroup?: Types.ObjectId;
  googleSheetLink: string;
  teamId: Types.ObjectId;
  assignedMembers: Types.ObjectId[];
  phases: IProjectPhase[];
  totalBudget: number;
  duration: number; // in month
  lastUpdate: IUpdateLog[];
  description: string;
  salesName: string;
  status: IStatus;
}

export interface IProjectPhaseUpdate {
  phase: IProjectPhase;
  type: "update" | "delete" | "add";
}

export interface IProjecUpdate {
  _id: string;
  name: string;
  clientName: string;
  projectGroup?: Types.ObjectId;
  googleSheetLink: string;
  teamId: Types.ObjectId;
  assignedMembers: Types.ObjectId[];
  phases: IProjectPhaseUpdate[];
  totalBudget: number;
  duration: number; // in month
  lastUpdate: IUpdateLog[];
  description: string;
  salesName: string;
  status: IStatus;
}

type TPhase = (typeof phases)[number];
