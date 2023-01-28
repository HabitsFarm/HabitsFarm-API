import { User } from "../../../domain/entities/User";
import { IAuthRepository } from "../../../repositories/Interfaces/interface-auth.repository";

export class SignUpUseCase {
  constructor(private repository: IAuthRepository) {}

  public async execute({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    try {
      const result = await this.repository.signUp({ email, name, password });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
