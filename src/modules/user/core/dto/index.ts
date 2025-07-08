export type UserCreateDTO = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserUpdateDTO = {
    name: string | null;
};

export type UserPropsDTO = {
    name: string | null | undefined;
};

export type UserSearchDTO = {
    id?: string[];
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
