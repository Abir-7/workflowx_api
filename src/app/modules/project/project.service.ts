/* eslint-disable @typescript-eslint/no-explicit-any */
import { status } from "http-status";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import mongoose, { Types } from "mongoose";
import { IProject, IProjecUpdate } from "./project.interface";
import Project from "./project.model";
import AppError from "../../errors/AppError";

import { removeFalsyFields } from "../../utils/helper/removeFalsyField";

/* eslint-disable arrow-body-style */
const createProject = async (projectData: IProject): Promise<IProject> => {
  const newProject = new Project(projectData);
  return await newProject.save();
};

const getAllProjects = async (): Promise<IProject[]> => {
  const data = await Project.find({ isDeleted: false })
    .populate({
      path: "assignedMembers",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName position email phone image user -_id",
    })
    .populate({
      path: "phases.members",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName  image -_id",
    })
    .populate("teamId")
    .populate("projectGroup")
    .populate({
      path: "lastUpdate.updatedBy",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName  image -_id",
    });

  return data;
};

const getProjectById = async (id: string): Promise<IProject | null> => {
  const data = await Project.findOne({ _id: id }, { isDeleted: false })
    .populate({
      path: "assignedMembers",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName position email phone image user -_id",
    })
    .populate({
      path: "phases.members",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName  image -_id",
    })
    .populate("teamId")
    .populate("projectGroup")
    .populate({
      path: "lastUpdate.updatedBy",
      foreignField: "user",
      model: "UserProfile",
      select: "fullName  image -_id",
    });

  if (!data) {
    throw new AppError(status.NOT_FOUND, "Data not found or is deleted.");
  }

  return data;
};

const updateProject = async (
  id: string,
  updateData: Partial<IProjecUpdate>
) => {
  const findProject = await Project.findOne({ _id: id, isDeleted: false });
  if (!findProject) {
    throw new AppError(status.NOT_FOUND, "Project not found");
  }

  const { phases, assignedMembers } = findProject;

  let removedIds: string[] = [];

  if (
    assignedMembers &&
    updateData.assignedMembers &&
    updateData.assignedMembers?.length > 0
  ) {
    const membersData = addRemoveMembers(
      updateData.assignedMembers,
      findProject?.assignedMembers
    );

    removedIds = membersData.dataToRemove;

    findProject?.phases.map((phase) => {
      phase.members = phase.members.filter((mem) => {
        const member = mem.toString();
        if (!membersData.dataToRemove.includes(member)) {
          return mem;
        }
      });
    });

    findProject.assignedMembers = [
      ...findProject.assignedMembers.filter((mem) => {
        const member = mem.toString();
        if (!membersData.dataToRemove.includes(member)) {
          return mem;
        }
      }),
      ...membersData.dataToAdd.map((mem) => new mongoose.Types.ObjectId(mem)),
    ];
  }

  if (phases && updateData.phases) {
    updateData.phases.map((phase) => {
      if (!phase.phase._id) {
        throw new AppError(status.NOT_FOUND, "Phase Id not found.");
      }

      if (phase.type === "delete") {
        findProject.phases = findProject?.phases.filter(
          (fphase) => fphase._id.toString() !== phase.phase._id
        );
      }

      if (phase.type === "add") {
        findProject?.phases.push(phase.phase);
      }

      if (phase.type === "update") {
        const {
          budget,
          deadline,
          members,
          name,
          status: p_status,
        } = phase.phase;

        findProject.phases.map((fphase) => {
          if (fphase._id.toString() === phase.phase._id.toString()) {
            if (budget) {
              fphase.budget = budget;
            }

            if (deadline) {
              fphase.deadline = deadline;
            }

            if (name) {
              fphase.name = name;
            }
            if (status) {
              fphase.status = p_status;
            }

            if (members) {
              let checkedMember: Types.ObjectId[] = members;

              if (!updateData.assignedMembers?.length) {
                checkedMember = members.filter((memb) => {
                  const mem = memb.toString();
                  if (
                    findProject.assignedMembers
                      .map((mem2) => mem2.toString())
                      .includes(mem)
                  ) {
                    return memb;
                  }
                });
              }

              const membersData = addRemoveMembers(
                checkedMember,
                fphase.members
              );

              fphase.members = [
                ...fphase.members.filter((mem) => {
                  const member = mem.toString();

                  if (!membersData.dataToRemove.includes(member)) {
                    return mem;
                  }
                }),
                ...membersData.dataToAdd
                  .map((mem) => {
                    if (!removedIds.includes(mem)) {
                      return new mongoose.Types.ObjectId(mem);
                    }
                  })
                  .filter((mem) => !!mem),
              ];
            }

            return fphase;
          } else {
            return fphase;
          }
        });
      }
    });
  }

  // update premitive data

  const otherData = removeFalsyFields({
    name: updateData.name,
    clientName: updateData.clientName,
    projectGroup: updateData.projectGroup,
    googleSheetLink: updateData.googleSheetLink,
    teamId: updateData.teamId,
    totalBudget: updateData.totalBudget,
    duration: updateData.duration,
    description: updateData.description,
    salesName: updateData.salesName,
    status: updateData.status,
  });

  for (const key in otherData) {
    (findProject as any)[key] = otherData[key as keyof typeof otherData];
  }

  await findProject?.save();
  return findProject;
};

const deleteProject = async (id: string): Promise<IProject | null> => {
  const data = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!data) {
    throw new Error("Data not found or already deleted.");
  }
  return data;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

// utils function
export const addRemoveMembers = (
  newArr: Types.ObjectId[],
  prevArr: Types.ObjectId[]
) => {
  const updatedMembers = newArr.map((mem) => mem.toString());
  const previousMembers = prevArr.map((mem) => mem.toString());
  // console.log({ updatedMembers, previousMembers });
  const dataToAdd = updatedMembers.filter(
    (mem) => !previousMembers.includes(mem)
  );

  const dataToRemove = updatedMembers.filter((mem) =>
    previousMembers.includes(mem)
  );

  return { dataToAdd, dataToRemove };
};
