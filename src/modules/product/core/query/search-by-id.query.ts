import { IQuery } from "@nestjs/cqrs";

export class SearchProductByIdQuery implements IQuery {
    id: string;

    constructor(id: any) {
        this.id = id;
    }

    static create(id: any) {
        return new SearchProductByIdQuery(id);
    }
}
