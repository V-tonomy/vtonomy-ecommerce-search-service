import { IQuery } from "@nestjs/cqrs";
import { ElasticQueryBuilder } from "src/domain";
import { PagingRequestDTO } from 'vtonomy';
import { ImageSearchDTO } from "../dto";

export class SearchImageQuery implements IQuery {
    props: ImageSearchDTO;
    paging: PagingRequestDTO;

    constructor(props: any, paging: PagingRequestDTO) {
        this.props = props;
        this.paging = paging;
    }

    public generateQuery(): Record<string, any> {
        const { id, productId } = this.props;

        const builder = new ElasticQueryBuilder({
            must: {
                id,
                productId,
            },
            sort: [{ field: "createdAt", order: "desc" }],
            from: this.paging.page - 1,
            size: this.paging.limit,
        });

        const query = builder.build();
        return query;
    }

    static create(props: ImageSearchDTO, paging: PagingRequestDTO) {
        return new SearchImageQuery(props, paging);
    }
}
