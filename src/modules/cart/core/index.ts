import {
    DeleteCartByIdHandler,
    DeleteCartItemByIdHandler,
    IndexCartHandler,
    IndexCartItemHandler,
    SearchCartByIdHandler,
    SearchCartHandler,
    SearchCartItemByIdHandler,
    SearchCartItemHandler,
    UpdateByIdCartHandler,
    UpdateByIdCartItemHandler,
} from "./handler";

export const CART_HANDLER = [
    IndexCartHandler,
    UpdateByIdCartHandler,
    DeleteCartByIdHandler,
    SearchCartHandler,
    SearchCartByIdHandler,

    IndexCartItemHandler,
    UpdateByIdCartItemHandler,
    DeleteCartItemByIdHandler,
    SearchCartItemHandler,
    SearchCartItemByIdHandler,
];
