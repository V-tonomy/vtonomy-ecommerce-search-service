import {
    CreateProductHandler,
    DeleteProductByIdHandler,
    SearchProductByIdHandler,
    SearchProductHandler,
    UpdateByIdProductHandler,
} from "./handler";

export const PRODUCT_HANDLER = [
    CreateProductHandler,
    UpdateByIdProductHandler,
    DeleteProductByIdHandler,
    SearchProductHandler,
    SearchProductByIdHandler,
];
