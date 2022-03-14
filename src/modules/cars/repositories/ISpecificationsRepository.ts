import { Specification } from "../entities/Specification";

interface ISpecificationRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ description, name }: ISpecificationRepositoryDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationRepositoryDTO, ISpecificationRepository };
