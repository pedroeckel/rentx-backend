import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: { license_plate },
        });

        return car;
    }

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true });

        if (name) {
            carsQuery.andWhere("car.name = :name", { name });
        }

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);

        return car;
    }
}

export { CarsRepository };
