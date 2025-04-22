/* eslint-disable arrow-body-style */
import ProjectGroup from "./projectGroup.model";
import { IProjectGroup } from "./projectGroup.interface";
import Project from "../project/project.model";
import AppError from "../../errors/AppError";
import status from "http-status";

const createProjectGroup = async (
  payload: IProjectGroup
): Promise<IProjectGroup> => {
  const isProjectExist = await Project.findOne({ _id: payload.projectId });

  if (!isProjectExist) {
    throw new AppError(status.NOT_FOUND, "Project not found.");
  }

  const group = new ProjectGroup(payload);
  return await group.save();
};

const getAllProjectGroups = async (): Promise<IProjectGroup[]> => {
  return await ProjectGroup.find({ isDeleted: false });
};

const getProjectGroupById = async (
  id: string
): Promise<IProjectGroup | null> => {
  const data = await ProjectGroup.findOne({ _id: id, isDeleted: false });
  if (!data) {
    throw new AppError(404, "Data not found, maybe deleted");
  }
  return data;
};

const updateProjectGroup = async (
  id: string,
  payload: Partial<IProjectGroup>
): Promise<IProjectGroup | null> => {
  const data = await ProjectGroup.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true }
  );

  if (!data) {
    throw new AppError(404, "Data not found to update or maybe deleted");
  }
  return data;
};

const deleteProjectGroup = async (
  id: string
): Promise<IProjectGroup | null> => {
  const data = await ProjectGroup.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!data) {
    throw new AppError(500, "Failed to delete data.");
  }
  return data;
};

export const ProjectGroupService = {
  createProjectGroup,
  getAllProjectGroups,
  getProjectGroupById,
  updateProjectGroup,
  deleteProjectGroup,
};
