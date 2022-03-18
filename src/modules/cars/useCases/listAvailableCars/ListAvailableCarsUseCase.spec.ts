import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro test 1",
            description: "Carro test 1",
            daily_rate: 100,
            license_plate: "CAR3562",
            brand: "VW",
            category_id: "category-id-1",
            fine_amount: 10,
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro test 2",
            description: "Carro test 2",
            daily_rate: 100,
            license_plate: "CAR3563",
            brand: "VW",
            category_id: "category-id-1",
            fine_amount: 10,
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro test 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro test 3",
            description: "Carro test 3",
            daily_rate: 100,
            license_plate: "CAR4063",
            brand: "Chevrolet",
            category_id: "category-id-1",
            fine_amount: 10,
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Chevrolet",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro test 4",
            description: "Carro test 4",
            daily_rate: 100,
            license_plate: "CAR4064",
            brand: "Chevrolet",
            category_id: "category-id-4",
            fine_amount: 10,
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category-id-4",
        });

        expect(cars).toEqual([car]);
    });
});
