import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import { ProjectGroupService } from "./projectGroup.service";

const createProjectGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectGroupService.createProjectGroup(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project group created successfully",
    data: result,
  });
});

const getAllProjectGroups = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProjectGroupService.getAllProjectGroups();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project groups retrieved successfully",
    data: result,
  });
});

const getProjectGroupById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectGroupService.getProjectGroupById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project group retrieved successfully",
    data: result,
  });
});

const updateProjectGroup = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectGroupService.updateProjectGroup(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project group updated successfully",
    data: result,
  });
});

const deleteProjectGroup = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectGroupService.deleteProjectGroup(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project group deleted successfully",
    data: result,
  });
});

export const ProjectGroupController = {
  createProjectGroup,
  getAllProjectGroups,
  getProjectGroupById,
  updateProjectGroup,
  deleteProjectGroup,
};
