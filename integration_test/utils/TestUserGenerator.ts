import { ICredentials } from "../../src/core/domain/entity/user/ICredentials";
import { USER_ROLE } from "../../src/app/common/constants";

export class TestUserGenerator {
  static parent(): ICredentials {
    return {
      username: "creche",
      password: "1234",
      role: USER_ROLE.PARENT
    };
  }

  static teacher(): ICredentials {
    return {
      username: "teacher1",
      password: "1234",
      role: USER_ROLE.TEACHER
    };
  }
}

