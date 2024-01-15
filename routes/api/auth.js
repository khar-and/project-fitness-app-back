const express = require("express");
const { validateBody, authenticate, upload } = require("../../midlewares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post(
  "/settings",
  authenticate,
  validateBody(schemas.userSettingsSchema),
  ctrl.setProfileSettings
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.addAvatar);

module.exports = router;
