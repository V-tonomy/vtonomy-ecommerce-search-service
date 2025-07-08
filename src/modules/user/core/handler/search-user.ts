import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchUserQuery } from "../query";
import { SearchService } from "../../../../usecase";

@QueryHandler(SearchUserQuery)
export class SearchUserHandler implements IQueryHandler<SearchUserQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchUserQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const users = await this.searchService.search("user", generateQuery);
        return users;
    }
}
