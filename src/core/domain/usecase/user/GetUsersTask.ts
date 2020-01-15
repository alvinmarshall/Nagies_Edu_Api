import { BaseUseCase } from "../BaseUsecase";
import { IUser } from "../../entity/user/IUser";
import { UserRepository } from "../../repository/user/UserRepository";
import { inject } from "inversify";
import { UserRepositoryImpl } from "../../../data/repository/user/UserRepositoryImpl";
import { GetUserParams } from "../../entity/user/GetUserParams";

export class GetUsersTask extends BaseUseCase<IUser[], GetUserParams> {
  private userRepository: UserRepository;

  constructor(@inject(UserRepositoryImpl) $userRepository: UserRepository) {
    super();
    this.userRepository = $userRepository;
  }
  protected generateUseCase(
    input?: GetUserParams | undefined
  ): Promise<IUser[]> {
    if (input == null) throw new Error("get user params can't be null");
    return this.userRepository.getUsers(input);
  }
}
