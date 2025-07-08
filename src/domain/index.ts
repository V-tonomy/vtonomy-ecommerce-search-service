type Value = string | number | boolean | Date | string[] | number[] | undefined;

interface QueryOptions {
    must?: Record<string, Value>;
    filter?: Record<string, Value>;
    should?: Record<string, Value>;
    range?: Record<string, { gte?: number | Date; lte?: number | Date }>;
    from?: number;
    size?: number;
    sort?: { field: string; order: "asc" | "desc" }[];
}

export class ElasticQueryBuilder {
    constructor(private options: QueryOptions) {}

    private buildClause(obj: Record<string, Value>, type: "must" | "filter" | "should") {
        const clause: any[] = [];

        for (const [key, value] of Object.entries(obj)) {
            if (value === undefined || value === null || value === "") continue;

            if (Array.isArray(value)) {
                clause.push({
                    terms: { [`${key}.keyword`]: value },
                });
            } else if (typeof value === "string") {
                clause.push({
                    match_phrase: { [key]: value },
                });
            } else if (
                typeof value === "number" ||
                value instanceof Date ||
                typeof value === "boolean"
            ) {
                clause.push({
                    term: { [key]: value },
                });
            }
        }

        return clause.length ? clause : undefined;
    }

    private buildRange(range: QueryOptions["range"]) {
        if (!range) return undefined;

        const clauses = Object.entries(range).map(([field, value]) => ({
            range: {
                [field]: {
                    ...(value.gte ? { gte: value.gte } : {}),
                    ...(value.lte ? { lte: value.lte } : {}),
                },
            },
        }));

        return clauses.length ? clauses : undefined;
    }

    public build(): any {
        const query: any = {
            bool: {},
        };

        const must = this.options.must ? this.buildClause(this.options.must, "must") : undefined;
        const filter = this.options.filter
            ? this.buildClause(this.options.filter, "filter")
            : undefined;
        const should = this.options.should
            ? this.buildClause(this.options.should, "should")
            : undefined;
        const range = this.buildRange(this.options.range);

        if (must) query.bool.must = must;
        if (filter) query.bool.filter = filter;
        if (should) query.bool.should = should;
        if (range) query.bool.filter = [...(query.bool.filter || []), ...range];

        if (Object.keys(query.bool).length === 0) {
            return { match_all: {} };
        }

        const final: any = { query };

        if (this.options.from !== undefined) final.from = this.options.from;
        if (this.options.size !== undefined) final.size = this.options.size;
        if (this.options.sort) {
            final.sort = this.options.sort.map(({ field, order }) => ({
                [field]: { order },
            }));
        }

        return final;
    }
}
