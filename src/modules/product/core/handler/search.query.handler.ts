import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as _ from "lodash";
import { SearchService } from "src/usecase";
import { SearchProductQuery } from "../query";

@QueryHandler(SearchProductQuery)
export class SearchProductHandler implements IQueryHandler<SearchProductQuery> {
    constructor(private searchService: SearchService) {}

    async execute(query: SearchProductQuery): Promise<any> {
        const { paging } = query;
        const generateQuery: any = query.generateQuery();

        const productHits = await this.searchService.search("product", generateQuery);
        let products = SearchService.extractSources(productHits);

        if (products.length > 0) {
            const ids = products.map((item) => item.id);
            const imageHits = await this.searchService.search("image", {
                query: {
                    terms: { [`productId.keyword`]: ids },
                },
            });
            const images = SearchService.extractSources(imageHits);

            const grouped = _.groupBy(images, "productId");
            products = products.map((p) => ({ ...p, images: grouped[p.id] ?? [] }));
        }

        return {
            data: products,
            total: {
                ...paging,
                ...productHits.hits.total,
            },
        };
    }
}
