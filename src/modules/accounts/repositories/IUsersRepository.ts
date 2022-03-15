import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    // findByUsername(username: string): Promise<User>;
    // update(user: User): Promise<User>;
}

export { IUsersRepository };