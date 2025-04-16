import { Request, Response } from "express";

import httpStatus from "http-status";
import { ProjectService } from "./project.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.updateProject(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
