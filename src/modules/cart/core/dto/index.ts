export type CartCreateDTO = {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CartUpdateDTO = {
    userId?: string;
    updatedAt: Date;
};

export type CartSearchDTO = {
    id?: string;
    userId?: string;
    createdAtFrom?: Date;
    createdAtTo?: Date;
    page?: number;
    limit?: number;
};

export type CartDeleteDTO = {
    id: string;
};

export type CartItemCreateDTO = {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CartItemUpdateDTO = {
    quantity?: number;
    updatedAt: Date;
};

export type CartItemSearchDTO = {
    id?: string;
    cartId?: string;
    productId?: string;
    createdAtFrom?: Date;
    createdAtTo?: Date;
    page?: number;
    limit?: number;
};

export type CartItemDeleteDTO = {
    id: string;
};
