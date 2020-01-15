import { injectable, inject } from "inversify";
import { GetAuthenticationTask } from "../../../core/domain/usecase/user/GetAuthenticationTask";
import { ICredentials } from "../../../core/domain/entity/user/ICredentials";
import { IUser } from "../../../core/domain/entity/user/IUser";
import { JwtService } from "../auth/JwtService";
import { JwtServiceImpl } from "../auth/JwtServiceImpl";
import { GetUsersTask } from "../../../core/domain/usecase/user/GetUsersTask";
import { GetUserParams } from "../../../core/domain/entity/user/GetUserParams";

@injectable()
export class UserService {
  private getAuthTask: GetAuthenticationTask;
  private jwtService: JwtService;
  private getUsersTask: GetUsersTask;

  constructor(
    @inject(GetAuthenticationTask) $getAuthTask: GetAuthenticationTask,
    @inject(JwtServiceImpl) $jwtService: JwtService,
    @inject(GetUsersTask) $getUsersTask: GetUsersTask
  ) {
    this.getAuthTask = $getAuthTask;
    this.jwtService = $jwtService;
    this.getUsersTask = $getUsersTask;
  }

  authenticateUser(credentials: ICredentials): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getAuthTask.buildUseCase(credentials);
        if (data.length === 0) return resolve(null);
        const user = data[0];
        user.role = credentials.role
        const token = this.jwtService.generateToken(user);
        const userInfo = {
          uuid: user.id,
          token: `Bearer ${token}`,
          imageUrl: user.imageUrl,
          role: user.role.toString(),
          level: user.level,
          name: user.name
        };
        resolve(userInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  getUser(params: GetUserParams): Promise<IUser> {
    return this.getUsersTask.buildUseCase(params).then(data => data[0]);
  }
}
