import { BaseUseCase } from "../BaseUsecase";
import { UserRepository } from "../../repository/user/UserRepository";
import { inject } from "inversify";
import { UserRepositoryImpl } from "../../../data/repository/user/UserRepositoryImpl";
import { GetUserParams } from "../../entity/user/GetUserParams";
import { USER_ROLE } from "../../../../app/common/constants";

export class GetUserProfileTask extends BaseUseCase<any[], GetUserParams> {
  userRepository: UserRepository;

  constructor(@inject(UserRepositoryImpl) $userRepository: UserRepository) {
    super();
    this.userRepository = $userRepository;
  }
  
  protected generateUseCase(input?: GetUserParams | undefined): Promise<any[]> {
    if (input === null) throw new Error("profile params can't be null");
    switch (input?.role) {
      case USER_ROLE.PARENT:
        return this.userRepository.getParent(input?.identifier!);
      case USER_ROLE.TEACHER:
        return this.userRepository.getTeacher(input?.identifier!);
      default:
        throw new Error(`Unknown role ${input?.role}`);
    }
  }
}
