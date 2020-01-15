import { injectable, inject } from "inversify";
import { GetAuthenticationTask } from "../../../core/domain/usecase/user/GetAuthenticationTask";
import { ICredentials } from "../../../core/domain/entity/user/ICredentials";
import { IUser } from "../../../core/domain/entity/user/IUser";

@injectable()
export class UserService {
  private getAuthTask: GetAuthenticationTask;

  constructor(
    @inject(GetAuthenticationTask) $getAuthTask: GetAuthenticationTask
  ) {
    this.getAuthTask = $getAuthTask;
  }

  authenticateUser(credentials: ICredentials): Promise<IUser[]> {
    return this.getAuthTask.buildUseCase(credentials);
  }
}
