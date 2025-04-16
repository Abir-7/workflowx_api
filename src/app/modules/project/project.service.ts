import { IProject } from "./project.interface";
import Project from "./project.model";

/* eslint-disable arrow-body-style */
const createProject = async (projectData: IProject): Promise<IProject> => {
  const newProject = new Project(projectData);
  return await newProject.save();
};

const getAllProjects = async (): Promise<IProject[]> => {
  return await Project.find().populate(
    "teamId assignedMembers projectGroup currentPhase members lastUpdate.updatedBy"
  );
};

const getProjectById = async (id: string): Promise<IProject | null> => {
  return await Project.findById(id).populate(
    "teamId assignedMembers projectGroup currentPhase members lastUpdate.updatedBy"
  );
};

const updateProject = async (
  id: string,
  updateData: Partial<IProject>
): Promise<IProject | null> => {
  return await Project.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProject = async (id: string): Promise<IProject | null> => {
  return await Project.findByIdAndDelete(id);
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
