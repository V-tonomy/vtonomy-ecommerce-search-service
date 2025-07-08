import { IQuery } from "@nestjs/cqrs";

export class SearchCartByIdQuery implements IQuery {
    id: string;

    constructor(id: any) {
        this.id = id;
    }

    static create(id: any) {
        return new SearchCartByIdQuery(id);
    }
}

export class SearchCartItemByIdQuery implements IQuery {
    id: string;

    constructor(id: any) {
        this.id = id;
    }

    static create(id: any) {
        return new SearchCartItemByIdQuery(id);
    }
}
