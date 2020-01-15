import { UserService } from "./user.service";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { USER_TYPE, USER_ROLE } from "../../common/constants";
import { ICredentials } from "../../../core/domain/entity/user/ICredentials";

@injectable()
export class UserController {
  private userService: UserService;
  /**
   *
   */
  constructor(@inject(UserService) $userService: UserService) {
    this.userService = $userService;
  }

  async authenticateUser(req: Request, res: Response) {
    try {
      const { role } = req.query;
      const body: ICredentials = req.body;
      body.role = this.assignUserRole(role);
      const data = await this.userService.authenticateUser(body);
      if (data === null) {
        return res
          .status(401)
          .send({ message: "username or password invalid", status: 401 });
      }
      data.message = "login successful";
      return res.send({ data, status: 200 });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Something went wrong, try again" });
    }
  }

  private assignUserRole(role: string): USER_ROLE {
    switch (role) {
      case USER_TYPE.parent:
        return USER_ROLE.PARENT;
      case USER_TYPE.teacher:
        return USER_ROLE.TEACHER;

      default:
        throw new Error(`Unknown user role ${role}`);
    }
  }
}
