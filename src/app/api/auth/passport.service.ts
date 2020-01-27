import { injectable, inject } from "inversify";
import { UserService } from "../user/user.service";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import config from "config";
import { IPayload } from "../model/IPayload";
import { GetUserParams } from "../../../core/domain/entity/user/GetUserParams";
import isEmpty from "lodash/isEmpty";

@injectable()
class PassportService {
  private userService: UserService;
  
  constructor(@inject(UserService) $userService: UserService) {
    this.userService = $userService;
  }

  init() {
    const opt: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("jwtConfig.secret")
    };
    const strategy = new Strategy(opt, async (payload: IPayload, done: any) => {
      try {
        const params: GetUserParams = {
          role: payload.role,
          identifier: payload.id
        };
        const data = await this.userService.getUser(params);
        data.role = params.role
        if (isEmpty(data)) {
          return done(null, false);
        }
        const tokenPayload = data;
        if (process.env.NODE_ENV === "development") {
          console.log(payload);
        }
        return done(null, tokenPayload);
      } catch (error) {
        return console.error(error);
      }
    });

    passport.use(strategy);
  }
}
export default PassportService;
