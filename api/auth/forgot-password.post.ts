import { ForgotPasswordController } from "../../app/modules/auth/forgot-password/forgot-password.controller";
import { ForgotPasswordUseCase } from "../../app/modules/auth/forgot-password/forgot-password.usecase";
import { PrismaAuthRepository } from "../../app/repositories/implementations/prisma/prisma-auth.repository";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new ForgotPasswordUseCase(repository);
  const controller = new ForgotPasswordController(useCase);

  return await controller.execute(event);
});
