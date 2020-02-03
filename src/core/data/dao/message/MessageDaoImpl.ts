import MessageDao from "./MessageDao";
import { IMessage } from "../../../domain/entity/message/IMessage";
import { BaseContext } from "../../context/BaseContext";
import { inject, injectable } from "inversify";
import { RemoteSource } from "../../../remote-source/RemoteSource";
import { TABLE_MESSAGE } from "../../../../app/common/constants";

@injectable()
export default class MessageDaoImpl implements MessageDao {
  context: BaseContext;

  constructor(@inject(RemoteSource) $context: BaseContext) {
    this.context = $context;
  }
  getParentMessage(
    level: string,
    identifier?: string | undefined
  ): Promise<IMessage[]> {
    const sql = `
        SELECT 
          id AS uid, 
          Message_BY AS sender,
          M_Date AS date, 
          Message AS content,
          Message_Level AS level
        FROM ${TABLE_MESSAGE} 
        WHERE Message_Level = ? OR Message_Level = ? ORDER BY M_Date DESC`;
    return this.context.query(sql, [level, identifier || ""]);
  }
}
