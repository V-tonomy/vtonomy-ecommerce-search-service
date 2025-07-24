import { IQuery } from "@nestjs/cqrs";
import { ElasticQueryBuilder } from "src/domain";
import { PagingRequestDTO } from 'vtonomy';
import { UserSearchDTO } from "../dto";

export class SearchUserQuery implements IQuery {
    props: UserSearchDTO;
    paging: PagingRequestDTO;

    constructor(props: any, paging: PagingRequestDTO) {
        this.props = props;
        this.paging = paging;
    }

    public generateQuery(): Record<string, any> {
        if (!this.props || Object.keys(this.props).length === 0) {
            return { match_all: {} };
        }

        const { name, id } = this.props;

        const builder = new ElasticQueryBuilder({
            must: {
                name: name,
                id: id,
            },
            sort: [{ field: "createdAt", order: "desc" }],
            from: this.paging.page - 1,
            size: this.paging.limit,
        });

        const query = builder.build();
        // console.log(query.bool)
        return query;
    }

    static create(props: UserSearchDTO, paging: PagingRequestDTO) {
        return new SearchUserQuery(props, paging);
    }
}
