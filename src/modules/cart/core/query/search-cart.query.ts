import { IQuery } from "@nestjs/cqrs";
import { ElasticQueryBuilder } from "src/domain";
import { PagingRequestDTO } from 'vtonomy';
import { CartItemSearchDTO, CartSearchDTO } from "../dto";

export class SearchCartQuery implements IQuery {
    props: CartSearchDTO;
    paging: PagingRequestDTO;

    constructor(props: any, paging: PagingRequestDTO) {
        this.props = props;
        this.paging = paging;
    }

    public generateQuery(): Record<string, any> {
        if (!this.props || Object.keys(this.props).length === 0) {
            return { match_all: {} };
        }

        const { id, userId } = this.props;

        const builder = new ElasticQueryBuilder({
            must: {
                id: id,
                userId,
            },
            sort: [{ field: "createdAt", order: "desc" }],
            from: this.paging.page - 1,
            size: this.paging.limit,
        });

        const query = builder.build();
        return query;
    }

    static create(props: CartSearchDTO, paging: PagingRequestDTO) {
        return new SearchCartQuery(props, paging);
    }
}

export class SearchCartItemQuery implements IQuery {
    props: CartItemSearchDTO;
    paging: PagingRequestDTO;

    constructor(props: any, paging: PagingRequestDTO) {
        this.props = props;
        this.paging = paging;
    }

    public generateQuery(): Record<string, any> {
        if (!this.props || Object.keys(this.props).length === 0) {
            return { match_all: {} };
        }

        const { id } = this.props;

        const builder = new ElasticQueryBuilder({
            must: {
                id: id,
            },
            sort: [{ field: "createdAt", order: "desc" }],
            from: this.paging.page - 1,
            size: this.paging.limit,
        });

        const query = builder.build();
        return query;
    }

    static create(props: CartItemSearchDTO, paging: PagingRequestDTO) {
        return new SearchCartItemQuery(props, paging);
    }
}
