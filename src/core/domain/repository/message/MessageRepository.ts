import { IMessage } from "../../entity/message/IMessage";

export interface MessageRepository {
  getParentMessage(level: string, identifier?: string): Promise<IMessage[]>;
}
