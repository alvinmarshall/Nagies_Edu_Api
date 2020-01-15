import { Container } from "inversify";
import { GetAuthenticationTask } from "../../core/domain/usecase/user/GetAuthenticationTask";
import { UserRepositoryImpl } from "../../core/data/repository/user/UserRepositoryImpl";
import { RemoteSource } from "../../core/remote-source/RemoteSource";
import { UserDaoImpl } from "../../core/data/dao/user/UserDaoImpl";
import config from "config";
import { UserService } from "../api/user/user.service";
import { UserController } from "../api/user/user.controller";
import { DataSourceImpl } from "../../core/data/source/DataSourceImpl";
import { JwtServiceImpl } from "../api/auth/JwtServiceImpl";
import PassportService from "../api/auth/passport.service";
import { GetUsersTask } from "../../core/domain/usecase/user/GetUsersTask";

let DIContainer = new Container();

//
// ─── CONTROLLER ─────────────────────────────────────────────────────────────────
//

DIContainer.bind<UserController>(UserController).toSelf();

//
// ─── SERVICE ────────────────────────────────────────────────────────────────────
//
DIContainer.bind<PassportService>(PassportService).toSelf();
DIContainer.bind<JwtServiceImpl>(JwtServiceImpl).toSelf();
DIContainer.bind<UserService>(UserService).toSelf();

//
// ─── DATA ───────────────────────────────────────────────────────────────────────
//

DIContainer.bind<UserRepositoryImpl>(UserRepositoryImpl).toSelf();
DIContainer.bind<DataSourceImpl>(DataSourceImpl).toSelf();

//
// ─── SOURCE ───────────────────────────────────────────────────────────────────────
//

DIContainer.bind<UserDaoImpl>(UserDaoImpl).toSelf();
DIContainer.bind<RemoteSource>(RemoteSource).toConstantValue(
  new RemoteSource(config.get("mysqlConfig"))
);

//
// ─── DOMAIN ─────────────────────────────────────────────────────────────────────
//
DIContainer.bind<GetUsersTask>(GetUsersTask).toSelf();
DIContainer.bind<GetAuthenticationTask>(GetAuthenticationTask).toSelf();

export default DIContainer;
