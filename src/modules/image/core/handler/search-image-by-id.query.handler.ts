import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchImageByIdQuery } from "../query";

@QueryHandler(SearchImageByIdQuery)
export class SearchImageByIdHandler implements IQueryHandler<SearchImageByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchImageByIdQuery): Promise<any> {
        const id = query.id;
        const image = await this.searchService.getById("image", id);
        return image;
    }
}
