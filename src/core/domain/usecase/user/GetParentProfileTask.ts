import { BaseUseCase } from "../BaseUsecase";
import { IParentEntity } from "../../entity/user/parent/IParentEntity";
import { UserRepository } from "../../repository/user/UserRepository";
import { inject } from "inversify";
import { UserRepositoryImpl } from "../../../data/repository/user/UserRepositoryImpl";

export class GetParentProfileTask extends BaseUseCase<IParentEntity[], string> {
  userRepository: UserRepository;

  constructor(@inject(UserRepositoryImpl) $userRepository: UserRepository) {
    super();
    this.userRepository = $userRepository
  }
  protected generateUseCase(
    input?: string | undefined
  ): Promise<IParentEntity[]> {
    if(input == null) throw new Error("parent identifier can't be null")
    return this.userRepository.getParent(input);
  }
}
