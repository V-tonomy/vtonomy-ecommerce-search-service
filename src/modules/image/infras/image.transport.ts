import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

import { Image_Created, PagingRequestDTO, PagingResponseDTO, ResponseDTO } from 'vtonomy';
import { IndexImageCommand } from "../core/command";
import { ImageSearchDTO } from "../core/dto";
import { SearchImageByIdQuery, SearchImageQuery } from "../core/query";

@Controller("search")
export class ImageController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @MessagePattern(Image_Created)
    async handleImageCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexImageCommand.create(data));
    }

    @Get("/image/:id")
    async getImageById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchImageByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @Post("/image")
    async searchImage(@Body() props: ImageSearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchImageQuery.create(props, paging));
        const data = res.hits?.hits?.map((item) => item._source);
        const total = res.hits.total;

        return new PagingResponseDTO(data, total);
    }
}
