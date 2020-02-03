import { MessageRepository } from "../../../domain/repository/message/MessageRepository";
import { IMessage } from "../../../domain/entity/message/IMessage";
import { DataSource } from "../../source/DataSource";
import { inject, injectable } from "inversify";
import { DataSourceImpl } from "../../source/DataSourceImpl";

@injectable()
export default class MessageRepositoryImpl implements MessageRepository {
  dataSource: DataSource;

  constructor(@inject(DataSourceImpl) $dataSource: DataSource) {
    this.dataSource = $dataSource;
  }
  
  getParentMessage(
    level: string,
    identifier?: string | undefined
  ): Promise<IMessage[]> {
    return this.dataSource.getParentMessage(level, identifier);
  }
}
