import { Router } from "express";
import { auth } from "../../middleware/auth/auth";
import { TeamController } from "./team.controller";
import { upload } from "../../middleware/fileUpload/fileUploadHandler";
import { parseDataField } from "../../middleware/fileUpload/parseDataField";

const router = Router();

router.post(
  "/add-team",
  auth("LEADER", "ADMIN"),
  upload.single("image"),
  parseDataField("data"),
  TeamController.createTeam
);

export const TeamRoute = router;
