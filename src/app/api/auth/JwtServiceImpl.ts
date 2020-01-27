import { JwtService } from "./JwtService";
import { IUser } from "../../../core/domain/entity/user/IUser";
import { IPayload } from "../model/IPayload";
import Jsonwebtoken from "jsonwebtoken";
import config from "config";
import { injectable } from "inversify";

@injectable()
export class JwtServiceImpl implements JwtService {
  generateToken($user: IUser): string {
    const payload: IPayload = {
      id: $user.id,
      faculty: $user.facultyName,
      level: $user.level,
      name: $user.name,
      ref: $user.ref,
      role: $user.role,
      username: $user.username
    };
    const encode = Jsonwebtoken.sign(payload, config.get("jwtConfig.secret"));
    return encode;
  }
}
