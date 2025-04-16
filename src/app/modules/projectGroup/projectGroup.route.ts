import express from "express";
import { ProjectGroupController } from "./projectGroup.controller";

const router = express.Router();

router.post("/", ProjectGroupController.createProjectGroup);
router.get("/", ProjectGroupController.getAllProjectGroups);
router.get("/:id", ProjectGroupController.getProjectGroupById);
router.patch("/:id", ProjectGroupController.updateProjectGroup);
router.delete("/:id", ProjectGroupController.deleteProjectGroup);

export const ProjectGroupRoute = router;
