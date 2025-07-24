import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

import {
    Image_Created,
    PagingRequestDTO,
    PagingResponseDTO,
    Product_Created,
    Product_Deleted,
    Product_Updated,
    ResponseDTO,
} from 'vtonomy';
import {
    DeleteProductByIdCommand,
    IndexProductCommand,
    UpdateProductByIdCommand,
} from "../core/command";
import { ProductSearchDTO } from "../core/dto";
import { SearchProductByIdQuery, SearchProductQuery } from "../core/query";

@Controller("search")
export class ProductController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @MessagePattern(Product_Created)
    async handleProductCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexProductCommand.create(data));
    }

    @MessagePattern(Product_Updated)
    async handleProductUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id, props } = data;
        await this.commandBus.execute(UpdateProductByIdCommand.create(id, props));
    }

    @MessagePattern(Product_Deleted)
    async handleProductDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id } = data;
        await this.commandBus.execute(DeleteProductByIdCommand.create(id));
    }

    @Get("/product/:id")
    async getProductById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchProductByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @Post("/product")
    async searchProduct(@Body() props: ProductSearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchProductQuery.create(props, paging));

        return new PagingResponseDTO(res.data, res.total);
    }
}
