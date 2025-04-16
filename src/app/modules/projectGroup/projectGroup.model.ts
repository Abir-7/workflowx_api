import { Schema, model } from "mongoose";
import { IProjectGroup } from "./projectGroup.interface";

const ProjectGroupSchema = new Schema<IProjectGroup>(
  {
    name: { type: String, required: true },
    projectId: { type: String },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProjectGroup = model<IProjectGroup>("ProjectGroup", ProjectGroupSchema);

export default ProjectGroup;
