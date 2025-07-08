import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchProductByIdQuery } from "../query";

@QueryHandler(SearchProductByIdQuery)
export class SearchProductByIdHandler implements IQueryHandler<SearchProductByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchProductByIdQuery): Promise<any> {
        const id = query.id;
        const product = await this.searchService.getById("product", id);
        return product;
    }
}
