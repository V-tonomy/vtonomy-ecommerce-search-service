import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchCategoryByIdQuery } from "../query";

@QueryHandler(SearchCategoryByIdQuery)
export class SearchCategoryByIdHandler implements IQueryHandler<SearchCategoryByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCategoryByIdQuery): Promise<any> {
        const id = query.id;
        const category = await this.searchService.getById("category", id);
        return category;
    }
}
