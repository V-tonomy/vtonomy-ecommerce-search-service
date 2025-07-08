import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "../../../../usecase";
import { SearchCartItemQuery, SearchCartQuery } from "../query";

@QueryHandler(SearchCartQuery)
export class SearchCartHandler implements IQueryHandler<SearchCartQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCartQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const users = await this.searchService.search("cart", generateQuery);
        return users;
    }
}

@QueryHandler(SearchCartItemQuery)
export class SearchCartItemHandler implements IQueryHandler<SearchCartItemQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCartItemQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const users = await this.searchService.search("cart-item", generateQuery);
        return users;
    }
}
