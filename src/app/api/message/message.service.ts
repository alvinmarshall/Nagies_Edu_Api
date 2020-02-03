import GetParentMessageTask from "../../../core/domain/usecase/message/GetParentMessageTask";
import { inject, injectable } from "inversify";
import { GetMessageParams } from "../../../core/domain/entity/message/GetMessageParams";
import { IMessage } from "../../../core/domain/entity/message/IMessage";

@injectable()
export default class MessageService {
  getParentMessageTask: GetParentMessageTask;

  constructor(
    @inject(GetParentMessageTask) $getParentMessageTask: GetParentMessageTask
  ) {
    this.getParentMessageTask = $getParentMessageTask;
  }

  getParentMessage(params: GetMessageParams): Promise<IMessage[]> {
    return this.getParentMessageTask.buildUseCase(params);
  }
}
