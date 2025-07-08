import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

import {
    Category_Created,
    Category_Deleted,
    Category_Updated,
    PagingRequestDTO,
    PagingResponseDTO,
    ResponseDTO,
} from "vtonomy";
import {
    DeleteCategoryByIdCommand,
    IndexCategoryCommand,
    UpdateCategoryByIdCommand,
} from "../core/command";
import { CategorySearchDTO } from "../core/dto";
import { SearchCategoryByIdQuery, SearchCategoryQuery } from "../core/query";

@Controller("search")
export class CategoryController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @MessagePattern(Category_Created)
    async handleCategoryCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexCategoryCommand.create(data));
    }

    @MessagePattern(Category_Updated)
    async handleCategoryUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id, props } = data;
        await this.commandBus.execute(UpdateCategoryByIdCommand.create(id, props));
    }

    @MessagePattern(Category_Deleted)
    async handleCategoryDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id } = data;
        await this.commandBus.execute(DeleteCategoryByIdCommand.create(id));
    }

    @Get("/category/:id")
    async getCategoryById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchCategoryByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @Post("/category")
    async searchCategory(@Body() props: CategorySearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchCategoryQuery.create(props, paging));
        const data = res.hits?.hits?.map((item) => item._source);
        const total = res.hits.total;

        return new PagingResponseDTO(data, total);
    }
}
