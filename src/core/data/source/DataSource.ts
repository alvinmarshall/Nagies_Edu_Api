import { ICredentials } from "../../domain/entity/user/ICredentials";
import { IUser } from "../../domain/entity/user/IUser";
import { GetUserParams } from "../../domain/entity/user/GetUserParams";
import { IParentEntity } from "../../domain/entity/user/parent/IParentEntity";
import { ITeacherEntity } from "../../domain/entity/user/teacher/ITeacherEntity";
import { IMessage } from "../../domain/entity/message/IMessage";

export interface DataSource {
  //
  // ─── MESSAGE ────────────────────────────────────────────────────────────────────
  //

  getParentMessage(level: string, identifier?: string): Promise<IMessage[]>;
  //
  // ─── USER ───────────────────────────────────────────────────────────────────────
  //

  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
  getUsers(params: GetUserParams): Promise<IUser[]>;
  getParent(identifier: string): Promise<IParentEntity[]>;
  getTeacher(identifier: string): Promise<ITeacherEntity[]>;
}
