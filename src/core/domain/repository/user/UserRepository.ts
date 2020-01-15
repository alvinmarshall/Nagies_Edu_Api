import { ICredentials } from "../../entity/user/ICredentials";
import { IUser } from "../../entity/user/IUser";
import { GetUserParams } from "../../entity/user/GetUserParams";

export interface UserRepository {
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
  getUsers(params:GetUserParams): Promise<IUser[]>;

}
