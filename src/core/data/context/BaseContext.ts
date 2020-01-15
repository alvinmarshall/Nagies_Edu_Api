import { injectable } from "inversify";

@injectable()
export abstract class BaseContext {
  protected connectionString: string;
  protected connection: any;

  constructor($connectionString: string) {
    this.connectionString = $connectionString;
  }

  abstract query(sql: string, args: any): Promise<any>;
}
