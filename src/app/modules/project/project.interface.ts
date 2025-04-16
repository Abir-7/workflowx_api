import { Types } from "mongoose";

export interface IProjectPhase {
  name: string;
  budget: number;
  members: string[];
  deadline: Date;
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
  currentPhase: IProjectPhase;
  phases: IProjectPhase[];
  totalBudget: number;
  duration: Date;
  lastUpdate: IUpdateLog[];
  description: string;
  salesName: string;
  status: IStatus;
}

export const status = {
  COMPLETED: "COMPLETED",
  ONGOING: "ONGOING",
  CENCELED: "CENCELED",
} as const;

export const projectStatus = Object.values(status);

export type IStatus = keyof typeof status;
