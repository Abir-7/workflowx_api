import { Router } from "express";
import { ProjectController } from "./project.controller";
import { auth } from "../../middleware/auth/auth";
import zodValidator from "../../middleware/zodValidator";
import { zodProjectUpdateSchema } from "./project.validation";

const router = Router();
router.post("/add-project", auth("LEADER"), ProjectController.createProject);
router.get(
  "/",
  auth("USER", "LEADER", "ADMIN"),
  ProjectController.getAllProjects
);
router.get(
  "/:id",
  auth("USER", "LEADER", "ADMIN"),
  ProjectController.getProjectById
);
router.patch(
  "/:id",
  auth("LEADER", "ADMIN"),
  zodValidator(zodProjectUpdateSchema),
  ProjectController.updateProject
);
router.delete("/:id", auth("LEADER", "ADMIN"), ProjectController.deleteProject);

export const ProjectRoute = router;
