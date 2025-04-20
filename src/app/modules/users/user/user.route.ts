import { Router } from "express";
import { UserController } from "./user.controller";

import { zodCreateUserSchema } from "./user.validation";
import zodValidator from "../../../middleware/zodValidator";
import { upload } from "../../../middleware/fileUpload/fileUploadHandler";
import { auth } from "../../../middleware/auth/auth";
import { parseDataField } from "../../../middleware/fileUpload/parseDataField";

const router = Router();

router.post(
  "/create-user",
  upload.single("image"),
  parseDataField("data"),
  zodValidator(zodCreateUserSchema),
  UserController.createUser
);

router.patch(
  "/update-profile-image",
  auth("ADMIN", "USER"),
  upload.single("file"),
  UserController.updateProfileImage
);

router.patch(
  "/update-profile-data",
  auth("ADMIN", "USER"),
  UserController.updateProfileData
);

router.patch("/update-user-role", auth("ADMIN"), UserController.updateUserRole);

export const UserRoute = router;
