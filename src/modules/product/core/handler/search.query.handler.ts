import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchProductQuery } from "../query";

@QueryHandler(SearchProductQuery)
export class SearchProductHandler implements IQueryHandler<SearchProductQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchProductQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const products = await this.searchService.search("product", generateQuery);
        return products;
    }
}
