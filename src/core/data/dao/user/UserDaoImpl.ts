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
import { GetUserParams } from "../../../domain/entity/user/GetUserParams";
import { IParentEntity } from "../../../domain/entity/user/parent/IParentEntity";

@injectable()
export class UserDaoImpl implements UserDao {
  private context: BaseContext;

  constructor(@inject(RemoteSource) $context: BaseContext) {
    this.context = $context;
  }

  getParent(identifier:string): Promise<IParentEntity[]> {
    const sql = `
      SELECT 
          id,
          Students_No AS studentNo,
          Level_Name AS level,
          Students_Name AS studentName,
          Index_No AS 'index',
          Image AS imageUrl,
          Faculty_Name AS faculty,
          Dob AS dob,
          Gender AS gender,
          Admin_Date AS admissionDate,
          Section_Name AS section,
          Semester_Name AS semester,
          Guardian_Name AS guardian,
          Guardian_No AS contact

      FROM ${TABLE_STUDENT} WHERE id = ? LIMIT 1`;
    return this.context.query(sql,[identifier])
  }

  getUsers(params: GetUserParams): Promise<IUser[]> {
    const sql = this.getUserSql(params.role);
    return this.context.query(sql, [params.identifier || ""]);
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

  private getUserSql(role: USER_ROLE): string {
    switch (role) {
      case USER_ROLE.PARENT:
        return ` SELECT 
      id,
      Students_No AS refNo,
      Level_Name AS level,
      Students_Name AS name,
      Index_No AS username,
      Image AS imageUrl,
      Faculty_Name AS facultyName
    FROM ${TABLE_STUDENT} WHERE id = ? LIMIT 1`;

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
        FROM ${TABLE_TEACHER} WHERE id = ? LIMIT 1 `;

      default:
        throw new Error("Unknown user role");
    }
  }
}
