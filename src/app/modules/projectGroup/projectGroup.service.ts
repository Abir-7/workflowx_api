/* eslint-disable arrow-body-style */
import ProjectGroup from "./projectGroup.model";
import { IProjectGroup } from "./projectGroup.interface";

const createProjectGroup = async (
  payload: IProjectGroup
): Promise<IProjectGroup> => {
  const group = new ProjectGroup(payload);
  return await group.save();
};

const getAllProjectGroups = async (): Promise<IProjectGroup[]> => {
  return await ProjectGroup.find();
};

const getProjectGroupById = async (
  id: string
): Promise<IProjectGroup | null> => {
  return await ProjectGroup.findById(id);
};

const updateProjectGroup = async (
  id: string,
  payload: Partial<IProjectGroup>
): Promise<IProjectGroup | null> => {
  return await ProjectGroup.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProjectGroup = async (
  id: string
): Promise<IProjectGroup | null> => {
  return await ProjectGroup.findByIdAndDelete(id);
};

export const ProjectGroupService = {
  createProjectGroup,
  getAllProjectGroups,
  getProjectGroupById,
  updateProjectGroup,
  deleteProjectGroup,
};
