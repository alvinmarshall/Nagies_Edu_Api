import { ICredentials } from "../../entity/user/ICredentials";
import { UserRepository } from "../../repository/user/UserRepository";
import { injectable, inject } from "inversify";
import { BaseUseCase } from "../BaseUsecase";
import { UserRepositoryImpl } from "../../../data/repository/user/UserRepositoryImpl";
import { IUser } from "../../entity/user/IUser";

@injectable()
export class GetAuthenticationTask extends BaseUseCase<
  IUser[],
  ICredentials
> {
  private userRepository: UserRepository;

  constructor(@inject(UserRepositoryImpl) $userRepository: UserRepository) {
    super();
    this.userRepository = $userRepository;
  }

  generateUseCase(input?: ICredentials | undefined): Promise<IUser[]> {
    if (input == null) throw new Error("user credentials can't be null");
    return this.userRepository.getUserWithCredentials(input);
  }
}
