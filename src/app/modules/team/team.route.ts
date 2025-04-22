import { Router } from "express";
import { auth } from "../../middleware/auth/auth";
import { TeamController } from "./team.controller";
import { upload } from "../../middleware/fileUpload/fileUploadHandler";
import { parseDataField } from "../../middleware/fileUpload/parseDataField";

const router = Router();

router.get("/", auth("LEADER", "ADMIN", "USER"), TeamController.getAllTeams);
router.get("/:id", auth("LEADER", "ADMIN", "USER"), TeamController.getTeamById);
router.post(
  "/add-team",
  auth("LEADER", "ADMIN"),
  upload.single("image"),
  parseDataField("data"),
  TeamController.createTeam
);
router.patch(
  "/:id",
  auth("LEADER", "ADMIN"),
  upload.single("image"),
  parseDataField("data"),
  TeamController.updateTeam
);

router.delete("/:id", auth("LEADER", "ADMIN"), TeamController.deleteTeam);

export const TeamRoute = router;
