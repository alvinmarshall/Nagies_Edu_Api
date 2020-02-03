import { BaseUseCase } from "../BaseUsecase";
import { IMessage } from "../../entity/message/IMessage";
import { GetMessageParams } from "../../entity/message/GetMessageParams";
import { injectable, inject } from "inversify";
import { MessageRepository } from "../../repository/message/MessageRepository";
import MessageRepositoryImpl from "../../../data/repository/message/MessageRepositoryImpl";

@injectable()
export default class GetParentMessageTask extends BaseUseCase<
  IMessage[],
  GetMessageParams
> {
  messageRepository: MessageRepository;
  constructor(
    @inject(MessageRepositoryImpl) $messageRepository: MessageRepository
  ) {
    super();
    this.messageRepository = $messageRepository;
  }
  protected generateUseCase(
    input?: GetMessageParams | undefined
  ): Promise<IMessage[]> {
    if (input == null) throw new Error("message params can't be null");
    return this.messageRepository.getParentMessage(
      input.level,
      input.identifier
    );
  }
}
