import { IQuery } from "@nestjs/cqrs";

export class SearchCategoryByIdQuery implements IQuery {
    id: string;

    constructor(id: any) {
        this.id = id;
    }

    static create(id: any) {
        return new SearchCategoryByIdQuery(id);
    }
}
