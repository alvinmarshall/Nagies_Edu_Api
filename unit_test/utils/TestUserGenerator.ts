import { ICredentials } from "../../src/core/domain/entity/user/ICredentials";
import { USER_ROLE } from "../../src/app/common/constants";
import { IUser } from "../../src/core/domain/entity/user/IUser";

export class TestUserGenerator {
  static getPerson(): IUser[] {
    return [
      {
        id: 1,
        adminDate: "test date",
        age: 1,
        dob: "test dob",
        facultyName: "test faculty",
        gender: "test gender",
        level: "test level",
        name: "test full name",
        password: "test password",
        refNo: "test ref",
        username:"test username"
      }
    ];
  }
  static credentials(): ICredentials {
    return {
      username: "test username",
      password: "test password",
      role: USER_ROLE.PARENT
    };
  }
}
