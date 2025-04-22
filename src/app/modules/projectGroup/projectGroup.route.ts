import express from "express";
import { ProjectGroupController } from "./projectGroup.controller";
import { auth } from "../../middleware/auth/auth";

const router = express.Router();

router.post(
  "/add-project-group",
  auth("ADMIN", "LEADER"),
  ProjectGroupController.createProjectGroup
);
router.get(
  "/",
  auth("ADMIN", "LEADER", "USER"),
  ProjectGroupController.getAllProjectGroups
);
router.get(
  "/:id",
  auth("ADMIN", "LEADER", "USER"),
  ProjectGroupController.getProjectGroupById
);
router.patch(
  "/:id",
  auth("ADMIN", "LEADER"),
  ProjectGroupController.updateProjectGroup
);
router.delete(
  "/:id",
  auth("ADMIN", "LEADER"),
  ProjectGroupController.deleteProjectGroup
);

export const ProjectGroupRoute = router;
