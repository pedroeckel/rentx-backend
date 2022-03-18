import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Fusca",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABC1234",
            brand: "VW",
            category_id: "1",
            fine_amount: 10,
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "Carro de luxo",
                daily_rate: 100,
                license_plate: "CAR1234",
                brand: "VW",
                category_id: "1",
                fine_amount: 10,
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Carro de luxo",
                daily_rate: 100,
                license_plate: "CAR1234",
                brand: "VW",
                category_id: "1",
                fine_amount: 10,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car1",
            description: "Carro de luxo",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            brand: "VW",
            category_id: "1",
            fine_amount: 10,
        });

        expect(car.available).toBe(true);
    });
});
