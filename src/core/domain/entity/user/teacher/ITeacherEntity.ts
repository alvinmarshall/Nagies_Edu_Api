import { IUser } from "../IUser";

export interface ITeacherEntity extends IUser {
  contact: string;
  uid: string;
}
