import { IMessage } from "../../../domain/entity/message/IMessage";

export default interface MessageDao {
  getParentMessage(level: string, identifier?: string): Promise<IMessage[]>;
}
