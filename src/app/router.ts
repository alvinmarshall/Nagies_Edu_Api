import { Express } from "express";
import userRoute from "./api/user";

export default (app: Express) => {
  app.use("/users", userRoute);
};
