import { IUser } from "../IUser";

export interface iTeacherEntity extends IUser {
  contact: string;
  facultyName:string;
  uid:string;
}
