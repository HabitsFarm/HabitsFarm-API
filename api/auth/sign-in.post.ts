import { SignInController } from "../../app/modules/auth/sign-in/sign-in.controller";
import { PrismaAuthRepository } from "../../app/repositories/implementations/prisma/prisma-auth.repository";
import { SignInUseCase } from "../../app/modules/auth/sign-in/sign-in.usecase";

export default defineEventHandler(async (event) => {
  const repository = new PrismaAuthRepository();
  const useCase = new SignInUseCase(repository);
  const controller = new SignInController(useCase);

  return await controller.execute(event);
});
