import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchCategoryQuery } from "../query";

@QueryHandler(SearchCategoryQuery)
export class SearchCategoryHandler implements IQueryHandler<SearchCategoryQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCategoryQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const categories = await this.searchService.search("category", generateQuery);
        return categories;
    }
}
