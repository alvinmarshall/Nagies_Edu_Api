import { USER_ROLE } from "../../common/constants";

export interface IPayload {
  id: number|string;
  ref: string;
  level: string;
  role: USER_ROLE;
  username: string;
  name: string;
  faculty: string;
}
