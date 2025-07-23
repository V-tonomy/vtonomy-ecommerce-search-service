import { Client } from "@elastic/elasticsearch";
import {
    Injectable,
    InternalServerErrorException,
    OnModuleDestroy,
    OnModuleInit,
} from "@nestjs/common";

@Injectable()
export class SearchService implements OnModuleInit, OnModuleDestroy {
    private elasticsearchService: Client;

    static extractSources = (res: any) => res?.hits?.hits?.map((item) => item._source) ?? [];

    async onModuleInit() {
        try {
            this.elasticsearchService = await new Client({
                node: process.env.ELASTICSEARCH_URL ?? "http://localhost:9200",
            });
            console.log("Connect to elastic search successfully");
        } catch (error) {
            console.log("Connect to elastic search fail", error);
        }
    }

    onModuleDestroy() {}

    async getById(index: string, id: string): Promise<any> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        try {
            const res = await this.elasticsearchService.get({
                index,
                id,
            });
            return res._source;
        } catch (error) {
            return null;
        }
    }

    async search(index: string, query: any = {}): Promise<any> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        let searchParams: any;

        if (query.query) {
            searchParams = {
                index,
                ...query,
            };
        } else {
            searchParams = {
                index,
                query,
            };
        }

        try {
            const res = await this.elasticsearchService.search(searchParams);
            return res;
        } catch (error) {
            return {
                hits: {
                    total: 0,
                    hits: [],
                },
            };
        }
    }

    async index(index: string, id: string, document: any): Promise<void> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch is not connected"));
        }

        await this.elasticsearchService.index({
            index: index,
            id,
            document: {
                id,
                ...document,
            },
        });
    }

    async indexMany(index: string, documents: any[]): Promise<void> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch is not connected"));
        }

        if (!documents || documents.length === 0) return;

        const bulkOps = documents.flatMap((doc) => [
            {
                index: {
                    _index: index,
                    _id: doc.id,
                },
            },
            {
                id: doc.id,
                ...doc,
            },
        ]);

        const result = await this.elasticsearchService.bulk({
            refresh: true,
            body: bulkOps,
        });

        if (result.errors) {
            const erroredDocuments = result.items.filter((item: any) => {
                const action = item.index || item.create;
                return action?.error;
            });

            console.error("Some documents failed to index:", erroredDocuments);
            throw new Error("Bulk indexing failed for some documents");
        }
    }

    async update(index: string, id: string, document: any): Promise<void> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        await this.elasticsearchService.update({
            index,
            id,
            doc: document,
        });
    }

    async delete(index: string, id: string): Promise<void> {
        if (!this.elasticsearchService) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        try {
            await this.elasticsearchService.delete({ index, id });
        } catch (error) {
            if (error.meta?.statusCode === 404) return;

            throw new InternalServerErrorException("Failed to delete document from Elasticsearch");
        }
    }
}
