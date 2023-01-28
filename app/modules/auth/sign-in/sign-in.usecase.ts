import { User } from "../../../domain/entities/User";
import { IAuthRepository } from "../../../repositories/interfaces/interface-auth.repository";

export class SignInUseCase {
  constructor(private repository: IAuthRepository) {}

  public async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    try {
      const result = await this.repository.signIn({ email, password });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
