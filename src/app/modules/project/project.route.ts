import { Router } from "express";
import { ProjectController } from "./project.controller";
import { auth } from "../../middleware/auth/auth";

const router = Router();
router.post("/add-project", auth("LEADER"), ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", ProjectController.updateProject);
router.delete("/:id", auth("LEADER"), ProjectController.deleteProject);

export const ProjectRoute = router;
