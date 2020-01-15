import { USER_ROLE } from "../../../../app/common/constants";

export interface GetUserParams {
    identifier?: number | string;
    role: USER_ROLE;
  }