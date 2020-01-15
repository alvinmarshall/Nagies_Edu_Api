import { USER_ROLE } from "../../../../app/common/constants";

export interface ICredentials {
  username: string;
  password: string;
  role: USER_ROLE;
}
