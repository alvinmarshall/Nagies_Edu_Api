import { GetMessageParams } from "../../src/core/domain/entity/message/GetMessageParams";
import { IMessage } from "../../src/core/domain/entity/message/IMessage";

export default class TestMessageGenerator {
  static getMessageParams(): GetMessageParams {
    return { level: "test level", identifier: "test identifier" };
  }
  static getMessageList(): IMessage[] {
    return [
      {
        content: "test content",
        date: "test date",
        level: "test level",
        sender: "test sender",
        uid: "test uid"
      }
    ];
  }
}
