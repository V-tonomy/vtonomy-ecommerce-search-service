import { IQuery } from "@nestjs/cqrs";
import { ElasticQueryBuilder } from "src/domain";
import { PagingRequestDTO } from 'vtonomy';
import { ProductSearchDTO } from "../dto";

export class SearchProductQuery implements IQuery {
    props: ProductSearchDTO;
    paging: PagingRequestDTO;

    constructor(props: any, paging: PagingRequestDTO) {
        this.props = props;
        this.paging = paging;
    }

    public generateQuery(): Record<string, any> {
        const { name, id, categoryId, description, toPrice, fromPrice } = this.props;

        const builder = new ElasticQueryBuilder({
            must: {
                id,
                name,
                categoryId,
                description,
            },
            range: {
                price: {
                    gte: fromPrice,
                    lte: toPrice,
                },
            },
            sort: [{ field: "createdAt", order: "desc" }],
            from: this.paging.page - 1,
            size: this.paging.limit,
        });

        const query = builder.build();
        return query;
    }

    static create(props: ProductSearchDTO, paging: PagingRequestDTO) {
        return new SearchProductQuery(props, paging);
    }
}
