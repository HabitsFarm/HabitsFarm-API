import { IAuthRepository } from "../../../repositories/interfaces/interface-auth.repository";

export class ResetPasswordUseCase {
  constructor(private repository: IAuthRepository) {}

  public async execute({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    try {
      const result = await this.repository.resetPassword({ token, password });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
