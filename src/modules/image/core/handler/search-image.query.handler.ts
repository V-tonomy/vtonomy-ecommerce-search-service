import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { SearchImageQuery } from "../query";

@QueryHandler(SearchImageQuery)
export class SearchImageHandler implements IQueryHandler<SearchImageQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchImageQuery): Promise<any> {
        const generateQuery: any = query.generateQuery();
        const images = await this.searchService.search("image", generateQuery);
        return images;
    }
}
