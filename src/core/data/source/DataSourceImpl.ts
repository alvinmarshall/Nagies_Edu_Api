import { DataSource } from "./DataSource";
import { ICredentials } from "../../domain/entity/user/ICredentials";
import { IUser } from "../../domain/entity/user/IUser";
import { UserDao } from "../dao/user/UserDao";
import { injectable, inject } from "inversify";
import { UserDaoImpl } from "../dao/user/UserDaoImpl";
import { GetUserParams } from "../../domain/entity/user/GetUserParams";
import { IParentEntity } from "../../domain/entity/user/parent/IParentEntity";
import { ITeacherEntity } from "../../domain/entity/user/teacher/ITeacherEntity";
import { IMessage } from "../../domain/entity/message/IMessage";
import MessageDao from "../dao/message/MessageDao";
import MessageDaoImpl from "../dao/message/MessageDaoImpl";

@injectable()
export class DataSourceImpl implements DataSource {
  private userDao: UserDao;
  private messageDao: MessageDao;

  constructor(@inject(UserDaoImpl) $userDao: UserDao,@inject(MessageDaoImpl) $messageDao: MessageDao) {
    this.userDao = $userDao;
    this.messageDao = $messageDao;
  }
  
  //
  // ─── MESSAGE ────────────────────────────────────────────────────────────────────
  //

  getParentMessage(
    level: string,
    identifier?: string | undefined
  ): Promise<IMessage[]> {
    return this.messageDao.getParentMessage(level, identifier);
  }

  //
  // ─── USER ───────────────────────────────────────────────────────────────────────
  //

  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]> {
    return this.userDao.getUserWithCredentials(credentials);
  }
  getUsers(params: GetUserParams): Promise<IUser[]> {
    return this.userDao.getUsers(params);
  }
  getParent(identifier: string): Promise<IParentEntity[]> {
    return this.userDao.getParent(identifier);
  }
  getTeacher(identifier: string): Promise<ITeacherEntity[]> {
    return this.userDao.getTeacher(identifier);
  }
}
