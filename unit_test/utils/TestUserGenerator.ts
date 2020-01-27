import { ICredentials } from "../../src/core/domain/entity/user/ICredentials";
import { USER_ROLE } from "../../src/app/common/constants";
import { IUser } from "../../src/core/domain/entity/user/IUser";
import { IParentEntity } from "../../src/core/domain/entity/user/parent/IParentEntity";
import { ITeacherEntity } from "../../src/core/domain/entity/user/teacher/ITeacherEntity";

export class TestUserGenerator {
  static getPerson(): IUser[] {
    return [
      {
        id: 1,
        admissionDate: "test date",
        age: 1,
        dob: "test dob",
        facultyName: "test faculty",
        gender: "test gender",
        level: "test level",
        name: "test full name",
        password: "test password",
        ref: "test ref",
        username: "test username",
        role: USER_ROLE.PARENT,
        contact: "test contact"
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

  static getParent(): IParentEntity[] {
    return [
      {
        id: 1,
        admissionDate: "test date",
        age: 1,
        dob: "test dob",
        facultyName: "test faculty",
        gender: "test gender",
        level: "test level",
        name: "test full name",
        password: "test password",
        ref: "test ref",
        username: "test username",
        role: USER_ROLE.PARENT,
        contact: "test contact",
        faculty: "test faculty",
        guardian: "test gurdian",
        index: "test index no",
        section: "test section",
        semester: "test semester",
        studentName: "test student name",
        studentNo: "test student no"
      }
    ];
  }

  static getTeacher(): ITeacherEntity[] {
    return [
      {
        id: 1,
        admissionDate: "test date",
        age: 1,
        dob: "test dob",
        facultyName: "test faculty",
        gender: "test gender",
        level: "test level",
        name: "test full name",
        password: "test password",
        ref: "test ref",
        username: "test username",
        role: USER_ROLE.PARENT,
        contact: "test contact",
        uid: "test uid"
      }
    ];
  }
}
