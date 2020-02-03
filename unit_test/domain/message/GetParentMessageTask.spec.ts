import "reflect-metadata";
import { MessageRepository } from "../../../src/core/domain/repository/message/MessageRepository";
import GetParentMessageTask from "../../../src/core/domain/usecase/message/GetParentMessageTask";
import { mock, instance, when, verify } from "ts-mockito";
import TestMessageGenerator from "../../utils/TestMessageGenerator";
import { assert, expect } from "chai";

describe.only("domain.usecase.message GetParentMessageTask Test", () => {
  let messageRepository: MessageRepository;
  let messageRepositoryInstance: MessageRepository;
  let getParentMessageTask: GetParentMessageTask;
  
  beforeEach(() => {
    messageRepository = mock<MessageRepository>();
    messageRepositoryInstance = instance(messageRepository);
    getParentMessageTask = new GetParentMessageTask(messageRepositoryInstance);
  });

  it("Get parent message with params success", async () => {
    const params = TestMessageGenerator.getMessageParams();
    const actual = TestMessageGenerator.getMessageList();
    when(
      messageRepository.getParentMessage(params.level, params.identifier)
    ).thenResolve(actual);
    const expected = await getParentMessageTask.buildUseCase(params);
    assert.equal(actual, expected);
    verify(
      messageRepository.getParentMessage(params.level, params.identifier)
    ).once();
  });

  it("Get parent message with null params throws an exception", () => {
      const errorMsg = "message params can't be null"
     expect(()=>getParentMessageTask.buildUseCase()).throw(errorMsg)
  });
});
