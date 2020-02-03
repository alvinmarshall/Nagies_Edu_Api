import { Express } from "express";
import userRoute from "./api/user";
import messageRoute from "./api/message"

export default (app: Express) => {
  app.use("/users", userRoute);
  app.use("/message", messageRoute);
};
