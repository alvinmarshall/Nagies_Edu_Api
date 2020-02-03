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
import { GetUserProfileTask } from "../../core/domain/usecase/user/GetUserProfileTask";
import GetParentMessageTask from "../../core/domain/usecase/message/GetParentMessageTask";
import MessageDaoImpl from "../../core/data/dao/message/MessageDaoImpl";
import MessageRepositoryImpl from "../../core/data/repository/message/MessageRepositoryImpl";
import MessageService from "../api/message/message.service";
import MessageController from "../api/message/message.controller";

let DIContainer = new Container();

//
// ─── CONTROLLER ─────────────────────────────────────────────────────────────────
//
DIContainer.bind<MessageController>(MessageController).toSelf();
DIContainer.bind<UserController>(UserController).toSelf();

//
// ─── SERVICE ────────────────────────────────────────────────────────────────────
//
DIContainer.bind<MessageService>(MessageService).toSelf();
DIContainer.bind<PassportService>(PassportService).toSelf();
DIContainer.bind<JwtServiceImpl>(JwtServiceImpl).toSelf();
DIContainer.bind<UserService>(UserService).toSelf();

//
// ─── DATA ───────────────────────────────────────────────────────────────────────
//
DIContainer.bind<MessageRepositoryImpl>(MessageRepositoryImpl).toSelf();
DIContainer.bind<UserRepositoryImpl>(UserRepositoryImpl).toSelf();
DIContainer.bind<DataSourceImpl>(DataSourceImpl).toSelf();

//
// ─── SOURCE ───────────────────────────────────────────────────────────────────────
//
DIContainer.bind<MessageDaoImpl>(MessageDaoImpl).toSelf();
DIContainer.bind<UserDaoImpl>(UserDaoImpl).toSelf();
DIContainer.bind<RemoteSource>(RemoteSource).toConstantValue(
  new RemoteSource(config.get("mysqlConfig"))
);

//
// ─── DOMAIN ─────────────────────────────────────────────────────────────────────
//
DIContainer.bind<GetParentMessageTask>(GetParentMessageTask).toSelf();
DIContainer.bind<GetUsersTask>(GetUsersTask).toSelf();
DIContainer.bind<GetAuthenticationTask>(GetAuthenticationTask).toSelf();
DIContainer.bind<GetUserProfileTask>(GetUserProfileTask).toSelf();

export default DIContainer;
