import { IQuery } from "@nestjs/cqrs";

export class SearchImageByIdQuery implements IQuery {
    id: string;

    constructor(id: any) {
        this.id = id;
    }

    static create(id: any) {
        return new SearchImageByIdQuery(id);
    }
}
