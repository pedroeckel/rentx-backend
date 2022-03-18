import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({
        description,
        name,
    }: ISpecificationRepositoryDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepositoryDTO, ISpecificationRepository };
