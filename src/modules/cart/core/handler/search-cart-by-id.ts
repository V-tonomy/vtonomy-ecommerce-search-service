import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "../../../../usecase";
import { SearchCartByIdQuery, SearchCartItemByIdQuery } from "../query";

@QueryHandler(SearchCartByIdQuery)
export class SearchCartByIdHandler implements IQueryHandler<SearchCartByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCartByIdQuery): Promise<any> {
        const id = query.id;
        const Cart = await this.searchService.getById("cart", id);
        return Cart;
    }
}

@QueryHandler(SearchCartItemByIdQuery)
export class SearchCartItemByIdHandler implements IQueryHandler<SearchCartItemByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchCartItemByIdQuery): Promise<any> {
        const id = query.id;
        const cartItem = await this.searchService.getById("cart-item", id);
        return cartItem;
    }
}
