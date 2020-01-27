import { IUser } from "../IUser";

export interface IParentEntity extends IUser {
  guardian: string;
  semester: string;
  index: string;
  section: string;
  studentNo:string;
  studentName:string
  faculty:string;
}
