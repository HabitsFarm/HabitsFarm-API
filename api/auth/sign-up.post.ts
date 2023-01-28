import { SignUpController } from "../../app/modules/auth/sign-up/sign-up.controller";
import { SignUpUseCase } from "../../app/modules/auth/sign-up/sign-up.usecase";
import { PrismaAuthRepository } from "../../app/repositories/implementations/prisma/prisma-auth.repository";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new SignUpUseCase(repository);
  const controller = new SignUpController(useCase);

  return await controller.execute(event);
});
