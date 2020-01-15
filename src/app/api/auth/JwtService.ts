import { IUser } from "../../../core/domain/entity/user/IUser";

export interface JwtService{
    generateToken($user: IUser):string
}