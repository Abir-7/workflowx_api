import { Types } from "mongoose";

export interface ITeam {
  name: string;
  members: Types.ObjectId[]; // Array of user IDs
  projects: Types.ObjectId[]; // Array of project IDs
  image: string; // e.g., URL of team logo or image
  leader: Types.ObjectId; // Single user ID (team lead)
  tagLine: string; // A short team slogan or description
}
