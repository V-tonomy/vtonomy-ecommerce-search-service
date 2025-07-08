import {
    CreateCategoryHandler,
    DeleteCategoryByIdHandler,
    SearchCategoryByIdHandler,
    SearchCategoryHandler,
    UpdateByIdCategoryHandler,
} from "./handler";

export const CATEGORY_HANDLER = [
    CreateCategoryHandler,
    UpdateByIdCategoryHandler,
    DeleteCategoryByIdHandler,
    SearchCategoryHandler,
    SearchCategoryByIdHandler,
];
