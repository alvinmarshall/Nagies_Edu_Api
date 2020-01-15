import { IUser } from "../IUser";

export interface IParentEntity extends IUser {
  guardianName: string;
  guardianContact: string;
  semesterName: string;
  indexNo: string;
  sectionName: string;
}
