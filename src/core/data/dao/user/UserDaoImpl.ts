import { UserDao } from "./UserDao";
import { ICredentials } from "../../../domain/entity/user/ICredentials";
import { IUser } from "../../../domain/entity/user/IUser";
import { BaseContext } from "../../context/BaseContext";
import { injectable, inject } from "inversify";
import { RemoteSource } from "../../../remote-source/RemoteSource";
import {
  TABLE_STUDENT,
  USER_ROLE,
  TABLE_TEACHER
} from "../../../../app/common/constants";

@injectable()
export class UserDaoImpl implements UserDao {
  private context: BaseContext;

  constructor(@inject(RemoteSource) $context: BaseContext) {
    this.context = $context;
  }
  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]> {
    const sql = this.getAuthSql(credentials);
    return this.context.query(sql, [
      credentials.username,
      credentials.password
    ]);
  }

  private getAuthSql(credentials: ICredentials): string {
    switch (credentials.role) {
      case USER_ROLE.PARENT:
        return `
        SELECT 
          id,
          Students_No AS refNo,
          Level_Name AS level,
          Students_Name AS name,
          Index_No AS username,
          Image AS imageUrl,
          Faculty_Name AS facultyName
        FROM ${TABLE_STUDENT} WHERE Index_No = ? AND Password = ? LIMIT 1`;
      case USER_ROLE.TEACHER:
        return `
        SELECT 
          id,
          Teachers_No AS refNo,
          Level_Name AS level,
          Teachers_Name AS name,
          Username AS username, 
          Image AS imageUrl,
          Faculty_Name AS facultyName
        FROM ${TABLE_TEACHER} WHERE Username = ? AND Password = ? LIMIT 1 `;

      default:
        throw new Error("Unknown user role");
    }
  }
}
