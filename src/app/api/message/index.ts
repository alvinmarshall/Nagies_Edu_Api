import express from "express";
import DIContainer from "../../di/di-container";
import MessageController from "./message.controller";
import passport from "passport";

const router = express.Router();
const controller = DIContainer.resolve<MessageController>(MessageController);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controller.getParentMessage(req, res);
  }
);
export default router;
