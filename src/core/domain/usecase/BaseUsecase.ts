import { injectable } from "inversify";

@injectable()
export abstract class BaseUseCase<T, Params> {
  protected abstract generateUseCase(input?: Params): Promise<T>;

  buildUseCase(input?: Params): Promise<T> {
    return this.generateUseCase(input);
  }
}
