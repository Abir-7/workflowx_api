import { Schema, model } from "mongoose";
import { ITeam } from "./team.interface";

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    image: { type: String },
    leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tagLine: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Team = model<ITeam>("Team", TeamSchema);
export default Team;
