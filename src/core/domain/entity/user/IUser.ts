import { USER_ROLE } from "../../../../app/common/constants";

export interface IUser {
  id: number | string;
  refNo: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  facultyName: string;
  password: string;
  imageUrl?: string;
  admissionDate: string;
  level: string;
  username: string;
  role: USER_ROLE;
  contact:string;
}
