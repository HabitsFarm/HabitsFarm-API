import bcrypt from "bcryptjs";
import { User } from "../../../domain/entities/User";
import { InMemoryAuthRepository } from "../../../repositories/implementations/in-memory/in-memory.repository";
import { inMemoryDB } from "../../../database/in-memory-db";
import { ForgotPasswordUseCase } from "../forgot-password/forgot-password.usecase";
import { ResetPasswordUseCase } from "./reset-password.usecase";

describe("Testing the Reset Password Use Case", () => {
  const repository = new InMemoryAuthRepository();

  const userData = { email: "existent-test@test.com", password: "12345678" };

  // Setup
  inMemoryDB.users.push(new User({ ...userData, name: "Test" }));
  const forgotPasswordUseCase = new ForgotPasswordUseCase(repository);

  it("Should reset the password", async () => {
    const { recoverToken } = await forgotPasswordUseCase.execute({
      email: userData.email,
    });

    const sut = new ResetPasswordUseCase(repository);

    await sut.execute({
      token: recoverToken,
      password: "1234567890",
    });

    expect(userData.password === inMemoryDB.users[0].password).toBeFalsy();
    expect(
      bcrypt.compareSync("12345678", inMemoryDB.users[0].password)
    ).toBeFalsy();
    expect(
      bcrypt.compareSync("1234567890", inMemoryDB.users[0].password)
    ).toBeTruthy();
  });
});
