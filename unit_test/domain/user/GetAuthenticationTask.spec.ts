import "reflect-metadata";
import { UserRepository } from "../../../src/core/domain/repository/user/UserRepository";
import { GetAuthenticationTask } from "../../../src/core/domain/usecase/user/GetAuthenticationTask";
import { mock, instance, when, verify } from "ts-mockito";
import { TestUserGenerator } from "../../utils/TestUserGenerator";
import { assert, expect } from "chai";
describe("domain.usecase GetAuthenticationTask Test", () => {
  let userRepository: UserRepository;
  let userRepositoryInstance: UserRepository;
  let getAuthenticationTask: GetAuthenticationTask;
  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userRepositoryInstance = instance(userRepository);
    getAuthenticationTask = new GetAuthenticationTask(userRepositoryInstance);
  });

  it("Authenticate user success", async () => {
    const actual = TestUserGenerator.getPerson();
    const credentials = TestUserGenerator.credentials();
    when(userRepository.getUserWithCredentials(credentials)).thenResolve(
      actual
    );
    const expected = await getAuthenticationTask.buildUseCase(credentials);
    assert.equal(actual, expected);
    verify(userRepository.getUserWithCredentials(credentials)).once();
  });

  it("Authenticate user with no credentials throws an exception", () => {
    const errorMsg = "user credentials can't be null";
    expect(() => getAuthenticationTask.buildUseCase()).throw(errorMsg);
  });
});
