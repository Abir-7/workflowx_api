import { model, Schema, Types } from "mongoose";
import { IProject, phases, phaseStatus, status } from "./project.interface";

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  clientName: { type: String, required: true },
  projectGroup: {
    type: Schema.Types.ObjectId,
    ref: "ProjectGroup",
    default: null,
  },
  googleSheetLink: { type: String, default: null },
  teamId: { type: Schema.Types.ObjectId, default: null, ref: "Team" },
  assignedMembers: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },

  phases: {
    type: [
      {
        name: { type: String, required: true, enum: phases },
        budget: { type: Number, default: 0 },
        members: [{ type: Schema.Types.ObjectId, default: null, ref: "User" }],
        deadline: { type: Date, default: null },
        status: {
          type: String,
          required: true,
          enum: Object.values(phaseStatus),
          default: "INACTIVE",
        },
      },
    ],
    default: [],
    _id: true,
  },
  totalBudget: { type: Number, required: true },
  duration: { type: Number, required: true },
  lastUpdate: {
    type: [
      {
        updatedBy: { type: Types.ObjectId, required: true, ref: "User" },
        date: { type: Date, required: true },
        note: { type: String, required: true },
      },
    ],
    default: null,
  },
  description: { type: String, required: true },
  salesName: { type: String, required: true },
  status: { type: String, enum: Object.values(status), default: "ONGOING" },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
