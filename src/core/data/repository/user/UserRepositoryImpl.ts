import { UserRepository } from "../../../domain/repository/user/UserRepository";
import { ICredentials } from "../../../domain/entity/user/ICredentials";
import { injectable, inject } from "inversify";
import { BaseSource } from "../../source/BaseSource";
import { IUser } from "../../../domain/entity/user/IUser";
import { DataSource } from "../../source/DataSource";
import { DataSourceImpl } from "../../source/DataSourceImpl";

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
}
