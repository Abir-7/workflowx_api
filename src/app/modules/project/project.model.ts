import { model, Schema } from "mongoose";
import {
  IProject,
  IProjectPhase,
  IUpdateLog,
  projectStatus,
} from "./project.interface";

const ProjectPhaseSchema = new Schema<IProjectPhase>(
  {
    name: { type: String, required: true },
    budget: { type: Number, required: true },
    members: [{ type: String, required: true }],
    deadline: { type: Date, required: true },
  },
  { _id: false }
);

const UpdateLogSchema = new Schema<IUpdateLog>(
  {
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    note: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    clientName: { type: String, required: true },
    projectGroup: { type: Schema.Types.ObjectId, ref: "Group" },
    googleSheetLink: { type: String, required: false },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    assignedMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    currentPhase: { type: ProjectPhaseSchema, required: true },
    phases: { type: [ProjectPhaseSchema], required: true },
    totalBudget: { type: Number, required: true },
    duration: { type: Date, required: true },
    lastUpdate: { type: [UpdateLogSchema], required: true },
    description: { type: String, required: true },
    salesName: { type: String, required: true },
    status: { type: String, enum: projectStatus, default: "ONGOING" },
  },
  {
    timestamps: true,
  }
);

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
