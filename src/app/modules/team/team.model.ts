import { Schema, model } from "mongoose";
import { ITeam } from "./team.interface";

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, default: "New Team" },
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    image: { type: String },
    leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tagLine: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const Team = model<ITeam>("Team", TeamSchema);
export default Team;
