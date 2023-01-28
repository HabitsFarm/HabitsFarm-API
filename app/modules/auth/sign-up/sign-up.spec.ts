import { inMemoryDB } from "../../../database/in-memory-db";
import { User } from "../../../domain/entities/User";
import { AppResult } from "../../../domain/types/app-result";
import { InMemoryAuthRepository } from "../../../repositories/implementations/in-memory/in-memory.repository";
import { SignUpUseCase } from "./sign-up.usecase";

describe("Testing the Sign In UseCase", () => {
  const repository = new InMemoryAuthRepository();

  const userData = { email: "existent-test@test.com", password: "12345678" };

  // Setup
  inMemoryDB.users.push(new User({ ...userData, name: "Test" }));

  it("Should to Sign Up successfully and return the user data", async () => {
    const sut = new SignUpUseCase(repository);

    const result = await sut.execute({
      email: "test1@test.com",
      password: "12345678",
      name: "Test",
    });

    expect(result.token).toBeTruthy();
    expect(result.user.email).toEqual("test1@test.com");
    expect(result.user.email).toEqual(inMemoryDB.users[1].email);
  });

  it("Should to Return an error because email is already in use", async () => {
    const sut = new SignUpUseCase(repository);

    try {
      const result = await sut.execute({
        email: "existent-test@test.com",
        name: "Test",
        password: "12345678",
      });

      expect(result).toBeFalsy();
    } catch (error) {
      expect((error as AppResult).message).toBeTruthy();
    }
  });
});
