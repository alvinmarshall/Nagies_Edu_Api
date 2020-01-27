import { UserRepository } from "../../../src/core/domain/repository/user/UserRepository";
import { mock, instance, when, verify } from "ts-mockito";
import { TestUserGenerator } from "../../utils/TestUserGenerator";
import { assert, expect } from "chai";
import { GetUserParams } from "../../../src/core/domain/entity/user/GetUserParams";
import { USER_ROLE } from "../../../src/app/common/constants";
import { GetUserProfileTask } from "../../../src/core/domain/usecase/user/GetUserProfileTask";

describe("domain.usecase.user GetUserProfileTask Test", () => {
  let userRepository: UserRepository;
  let userRepositoryInstance: UserRepository;
  let getUserProfileTask: GetUserProfileTask;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userRepositoryInstance = instance(userRepository);
    getUserProfileTask = new GetUserProfileTask(userRepositoryInstance);
  });

  it("Get parent profile with params success", async () => {
    const params: GetUserParams = {
      role: USER_ROLE.PARENT,
      identifier: "1"
    };
    const actual = TestUserGenerator.getParent();
    when(userRepository.getParent(params.identifier!)).thenResolve(actual);
    const expected = await getUserProfileTask.buildUseCase(params)
    assert.equal(actual, expected);
    verify(userRepository.getParent(params.identifier!)).once();
  });

  

  it("Get teacher profile with params success", async () => {
    const params: GetUserParams = {
      role: USER_ROLE.TEACHER,
      identifier: "1"
    };
    const actual = TestUserGenerator.getTeacher();
    when(userRepository.getTeacher(params.identifier!)).thenResolve(actual);
    const expected = await getUserProfileTask.buildUseCase(params);
    assert.equal(actual, expected);
    verify(userRepository.getTeacher(params.identifier!)).once();
  });

 
});
