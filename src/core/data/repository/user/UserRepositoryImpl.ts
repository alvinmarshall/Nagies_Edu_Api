import { UserRepository } from "../../../domain/repository/user/UserRepository";
import { ICredentials } from "../../../domain/entity/user/ICredentials";
import { injectable, inject } from "inversify";
import { BaseSource } from "../../source/BaseSource";
import { IUser } from "../../../domain/entity/user/IUser";
import { DataSource } from "../../source/DataSource";
import { DataSourceImpl } from "../../source/DataSourceImpl";
import { GetUserParams } from "../../../domain/entity/user/GetUserParams";
import { IParentEntity } from "../../../domain/entity/user/parent/IParentEntity";

@injectable()
export class UserRepositoryImpl implements BaseSource, UserRepository {
  dataSource: DataSource;

  constructor(@inject(DataSourceImpl) $dataSource: DataSource) {
    this.dataSource = $dataSource;
  }

  //
  // ─── USER ───────────────────────────────────────────────────────────────────────
  //

  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]> {
    return this.dataSource.getUserWithCredentials(credentials);
  }

  getUsers(params: GetUserParams): Promise<IUser[]> {
    return this.dataSource.getUsers(params);
  }
  getParent(identifier:string): Promise<IParentEntity[]> {
    return this.dataSource.getParent(identifier)
  }
}
