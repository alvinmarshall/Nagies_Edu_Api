import { BaseContext } from "../data/context/BaseContext";
import { injectable } from "inversify";
import mysql from "mysql";

@injectable()
export class RemoteSource extends BaseContext {
  constructor($connectionString: string) {
    super($connectionString);
    this.connection = mysql.createPool(this.connectionString);
  }

  query(sql: string, args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err: any, results: any) => {
        if (err) return reject(err);
        console.log("results", JSON.stringify(results));
        return resolve(results);
      });
    });
  }
}
