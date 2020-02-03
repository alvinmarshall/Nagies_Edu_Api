import MessageService from "./message.service";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { GetMessageParams } from "../../../core/domain/entity/message/GetMessageParams";

@injectable()
export default class MessageController {
  messageService: MessageService;
  /**
   *
   */
  constructor(@inject(MessageService) $messageService: MessageService) {
    this.messageService = $messageService;
  }

  async getParentMessage(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { level, ref } = req.user;
      const params: GetMessageParams = { level, identifier: ref };
      const messages = await this.messageService.getParentMessage(params);
      return res.send({ messages, status: 200 });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "", status: 500 });
    }
  }
}
