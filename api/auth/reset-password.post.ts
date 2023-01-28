import { ResetPasswordController } from "../../app/modules/auth/reset-password/reset-password.controller";
import { ResetPasswordUseCase } from "../../app/modules/auth/reset-password/reset-password.usecase";
import { PrismaAuthRepository } from "../../app/repositories/implementations/prisma/prisma-auth.repository";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new ResetPasswordUseCase(repository);
  const controller = new ResetPasswordController(useCase);

  return await controller.execute(event);
});
