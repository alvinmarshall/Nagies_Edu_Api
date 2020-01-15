import { ICredentials } from "../../entity/user/ICredentials";
import { IUser } from "../../entity/user/IUser";

export interface UserRepository {
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
}
