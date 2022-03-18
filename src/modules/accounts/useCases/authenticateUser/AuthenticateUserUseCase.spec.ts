import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
    });

    it("should be able to authenticate user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123456789",
            email: "user@test.com",
            name: "User Test",
            password: "123456",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an noneexistente user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@mail.com",
                password: "1254513123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "123456789",
                email: "user_wrong_password@test.com",
                name: "User Test Wrong Password",
                password: "123456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong_password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
