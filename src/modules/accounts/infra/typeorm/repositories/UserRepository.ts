import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name: data.name,
            password: data.password,
            email: data.email,
            driver_license: data.driver_license,
            avatar: data.avatar,
            id: data.id,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { email } });

        return user;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export { UsersRepository };
