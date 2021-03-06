import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const OpenRentalByCar = await this.repository.findOne({
            where: {
                car_id,
            },
        });

        return OpenRentalByCar;
    }

    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        const OpenRentalByUser = await this.repository.findOne({
            where: {
                user_id,
            },
        });

        return OpenRentalByUser;
    }
}

export { RentalsRepository };
