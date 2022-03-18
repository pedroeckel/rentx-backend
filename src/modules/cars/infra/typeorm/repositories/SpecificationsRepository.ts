import { getRepository, Repository } from "typeorm";

import {
    ISpecificationRepository,
    ISpecificationRepositoryDTO,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        description,
        name,
    }: ISpecificationRepositoryDTO): Promise<Specification> {
        const specification = await this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: {
                name,
            },
        });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }
}

export { SpecificationRepository };
