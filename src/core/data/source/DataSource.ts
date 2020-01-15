import { ICredentials } from "../../domain/entity/user/ICredentials";
import { IUser } from "../../domain/entity/user/IUser";
import { GetUserParams } from "../../domain/entity/user/GetUserParams";

export interface DataSource {
  //
  // ─── USER ───────────────────────────────────────────────────────────────────────
  //

  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
  getUsers(params: GetUserParams): Promise<IUser[]>;
}
