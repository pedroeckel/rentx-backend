import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = null;

const listCategoriesUseCaseUseCase = new ListCategoriesUseCase(
    categoriesRepository
);

const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCaseUseCase
);

export { listCategoriesController };
