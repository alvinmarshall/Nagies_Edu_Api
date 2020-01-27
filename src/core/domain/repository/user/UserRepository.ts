import { ICredentials } from "../../entity/user/ICredentials";
import { IUser } from "../../entity/user/IUser";
import { GetUserParams } from "../../entity/user/GetUserParams";
import { IParentEntity } from "../../entity/user/parent/IParentEntity";
import { ITeacherEntity } from "../../entity/user/teacher/ITeacherEntity";

export interface UserRepository {
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
  getUsers(params: GetUserParams): Promise<IUser[]>;
  getParent(identifier: string | number): Promise<IParentEntity[]>;
  getTeacher(identifier: string | number): Promise<ITeacherEntity[]>;
}
