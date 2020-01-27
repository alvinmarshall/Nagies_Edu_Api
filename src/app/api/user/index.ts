import DIContainer from "../../di/di-container";
import { UserController } from "./user.controller";
import express from "express";
import passport from "passport";

const router = express.Router();
const controller = DIContainer.resolve<UserController>(UserController);

router.post("/login", (req, res) => {
  controller.authenticateUser(req, res);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getUserProfile(req, res);
  }
);

export default router;
