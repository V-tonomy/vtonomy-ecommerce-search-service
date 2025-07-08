export type CreateCategoryDTO = {
    id: string;
    name: string;
    description: string | null;
    parentCategoryId: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type UpdateCategoryDTO = {
    name: string | null;
    description: string | null;
    parentCategoryId: string | null;
};

export type CategoryPropsDTO = {
    name: string | null | undefined;
    description: string | null | undefined;
    parentCategoryId: string | null | undefined;
};

export type CategorySearchDTO = {
    id?: string[];
    name?: string;
    description?: string;
    parentCategoryId?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
