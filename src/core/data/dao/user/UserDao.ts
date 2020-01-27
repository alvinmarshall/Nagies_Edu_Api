import { ICredentials } from "../../../domain/entity/user/ICredentials";
import { IUser } from "../../../domain/entity/user/IUser";
import { GetUserParams } from "../../../domain/entity/user/GetUserParams";
import { IParentEntity } from "../../../domain/entity/user/parent/IParentEntity";

export interface UserDao {
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
  getUsers(params: GetUserParams): Promise<IUser[]>;
  getParent(identifier:string): Promise<IParentEntity[]> 

}
