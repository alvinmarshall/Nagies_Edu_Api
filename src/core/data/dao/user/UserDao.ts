import { ICredentials } from "../../../domain/entity/user/ICredentials";
import { IUser } from "../../../domain/entity/user/IUser";

export interface UserDao {
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
}
