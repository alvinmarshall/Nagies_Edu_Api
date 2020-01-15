import { ICredentials } from "../../domain/entity/user/ICredentials";
import { IUser } from "../../domain/entity/user/IUser";

export interface DataSource {
  //
  // ─── USER ───────────────────────────────────────────────────────────────────────
  //

  getUserWithCredentials(credentials: ICredentials): Promise<IUser[]>;
}
