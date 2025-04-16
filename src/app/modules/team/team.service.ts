/* eslint-disable arrow-body-style */
import Team from "./team.model";
import { ITeam } from "./team.interface";

const createTeam = async (payload: ITeam): Promise<ITeam> => {
  const newTeam = new Team(payload);
  return await newTeam.save();
};

const getAllTeams = async (): Promise<ITeam[]> => {
  return await Team.find().populate("members projects leader");
};

const getTeamById = async (id: string): Promise<ITeam | null> => {
  return await Team.findById(id).populate("members projects leader");
};

const updateTeam = async (
  id: string,
  payload: Partial<ITeam>
): Promise<ITeam | null> => {
  return await Team.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTeam = async (id: string): Promise<ITeam | null> => {
  return await Team.findByIdAndDelete(id);
};

export const TeamService = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
