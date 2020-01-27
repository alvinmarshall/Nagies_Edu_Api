import { UserRepository } from "../../../src/core/domain/repository/user/UserRepository";
import { GetParentProfileTask } from "../../../src/core/domain/usecase/user/GetParentProfileTask";
import { mock, instance, when, verify } from "ts-mockito";
import { TestUserGenerator } from "../../utils/TestUserGenerator";
import { assert, expect } from "chai";

describe("domain.usecase.user GetParentProfileTask Test", () => {
  let userRepository: UserRepository;
  let userRepositoryInstance: UserRepository;
  let getParentProfileTask: GetParentProfileTask;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userRepositoryInstance = instance(userRepository);
    getParentProfileTask = new GetParentProfileTask(userRepositoryInstance);
  });

  it("Get parent profile with params success", async () => {
    const identifier = "1";
    const actual = TestUserGenerator.getParent();
    when(userRepository.getParent(identifier)).thenResolve(actual);
    const expected = await getParentProfileTask.buildUseCase(identifier);
    assert.equal(actual, expected);
    verify(userRepository.getParent(identifier)).once();
  });

  it("Get parent profile with no params throws an exception",  () => {
    const errorMsg = "parent identifier can't be null";
    expect(() => getParentProfileTask.buildUseCase()).throw(errorMsg);
  });
});
