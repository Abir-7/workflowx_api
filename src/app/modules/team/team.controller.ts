import { Request, Response } from "express";

import httpStatus from "http-status";
import { TeamService } from "./team.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getRelativePath } from "../../middleware/fileUpload/getRelativeFilePath";

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const value = req.body;
  if (req.file) {
    value.image = getRelativePath(req.file.path);
  }

  if (userId) {
    value.leader = userId;
    value.members.push(userId);
  }

  const result = await TeamService.createTeam(value);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Team created successfully",
    data: result,
  });
});

const getAllTeams = catchAsync(async (_req: Request, res: Response) => {
  const result = await TeamService.getAllTeams();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Teams retrieved successfully",
    data: result,
  });
});

const getTeamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.getTeamById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team retrieved successfully",
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const value = req.body;
  if (req.file) {
    value.image = getRelativePath(req.file.path);
  }

  const result = await TeamService.updateTeam(id, value);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team updated successfully",
    data: result,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.deleteTeam(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team deleted successfully",
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
