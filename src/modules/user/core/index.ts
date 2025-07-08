import {
    DeleteUserByIdHandler,
    IndexUserHandler,
    SearchUserByIdHandler,
    SearchUserHandler,
    UpdateByIdUserHandler,
} from "./handler";

export const USER_HANDLER = [
    IndexUserHandler,
    UpdateByIdUserHandler,
    DeleteUserByIdHandler,
    SearchUserHandler,
    SearchUserByIdHandler,
];
