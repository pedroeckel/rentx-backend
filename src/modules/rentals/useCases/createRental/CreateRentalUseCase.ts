import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {
        /**/
    }

    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minHour = 24;

        const carUnavailable =
            await this.rentalsRepository.findOpenRentalByCarId(car_id);

        if (carUnavailable) {
            throw new AppError("Car already rented");
        }

        const userUnavailable =
            await this.rentalsRepository.findOpenRentalByUserId(user_id);

        if (userUnavailable) {
            throw new AppError("User already rented");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minHour) {
            throw new AppError(
                "Expected return date must be at least 24 hours"
            );
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
