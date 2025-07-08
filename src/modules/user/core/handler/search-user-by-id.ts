import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchUserByIdQuery } from "../query";
import { SearchService } from "../../../../usecase";

@QueryHandler(SearchUserByIdQuery)
export class SearchUserByIdHandler implements IQueryHandler<SearchUserByIdQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchUserByIdQuery): Promise<any> {
        const id = query.id;
        const User = await this.searchService.getById("user", id);
        return User;
    }
}
