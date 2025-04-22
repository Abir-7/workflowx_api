/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import Team from "./team.model";
import { ITeam } from "./team.interface";
import AppError from "../../errors/AppError";
import unlinkFile from "../../utils/unlinkFiles";
import { removeFalsyFields } from "../../utils/helper/removeFalsyField";
import { addRemoveMembers } from "../project/project.service";
import mongoose from "mongoose";

const createTeam = async (payload: ITeam): Promise<ITeam> => {
  const data = await Team.create(payload);

  if (!data) {
    unlinkFile(payload.image);
  }

  return data;
};

const getAllTeams = async (): Promise<ITeam[]> => {
  return await Team.find({ isDeleted: false })
    .populate({
      path: "members",
      foreignField: "user",
      model: "UserProfile",
      populate: { path: "user", select: "role" },
    })
    .populate({
      path: "leader",
      foreignField: "user",
      model: "UserProfile",
      populate: { path: "user", select: "role" },
    });
};

const getTeamById = async (id: string): Promise<ITeam | null> => {
  const data = await Team.findOne({ _id: id, isDeleted: false })
    .populate({
      path: "members",
      foreignField: "user",
      model: "UserProfile",
      populate: { path: "user", select: "role" },
    })
    .populate({
      path: "leader",
      foreignField: "user",
      model: "UserProfile",
      populate: { path: "user", select: "role" },
    });

  if (!data) {
    throw new AppError(400, "Team not found or is deleted.");
  }
  return data;
};

const updateTeam = async (
  id: string,
  payload: Partial<ITeam>
): Promise<ITeam | null> => {
  const team = await Team.findOne({ _id: id, isDeleted: false });

  if (!team) {
    throw new AppError(400, "Team not found");
  }
  const { image, members: updatedMembers, ...otherData } = payload;

  if (updatedMembers) {
    const memberData = addRemoveMembers(updatedMembers, team.members);

    team.members = [
      ...team.members.filter((mem) => {
        const member = mem.toString();

        if (!memberData.dataToRemove.includes(member)) {
          return mem;
        }
      }),
      ...memberData.dataToAdd.map((mem) => new mongoose.Types.ObjectId(mem)),
    ];
  }

  if (image) {
    unlinkFile(team.image);
    team.image = image;
  }

  const newData = removeFalsyFields(otherData) as Partial<ITeam>;

  for (const key in newData) {
    (team as any)[key] = (newData as any)[key];
  }

  await team.save();
  return team;
};

const deleteTeam = async (id: string): Promise<ITeam | null> => {
  const data = await Team.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!data) {
    throw new AppError(400, "Team not found to delete.");
  }
  return data;
};

export const TeamService = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
