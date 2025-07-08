import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

import {
    Cart_Created,
    Cart_Deleted,
    Cart_Item_Created,
    Cart_Item_Deleted,
    Cart_Item_Updated,
    Cart_Updated,
    JwtAuthGuard,
    PagingRequestDTO,
    PagingResponseDTO,
    ResponseDTO,
} from "vtonomy";
import {
    DeleteCartByIdCommand,
    DeleteCartItemByIdCommand,
    IndexCartCommand,
    IndexCartitemCommand,
    UpdateCartByIdCommand,
    UpdateCartItemByIdCommand,
} from "../core/command";
import { CartItemSearchDTO, CartSearchDTO } from "../core/dto";
import {
    SearchCartByIdQuery,
    SearchCartItemByIdQuery,
    SearchCartItemQuery,
    SearchCartQuery,
} from "../core/query";

@Controller("search")
export class CartController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @MessagePattern(Cart_Created)
    async handleCartCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexCartCommand.create(data));
    }

    @MessagePattern(Cart_Updated)
    async handleCartUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id, props } = data;
        await this.commandBus.execute(UpdateCartByIdCommand.create(id, props));
    }

    @MessagePattern(Cart_Deleted)
    async handleCartDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id } = data;
        await this.commandBus.execute(DeleteCartByIdCommand.create(id));
    }

    @MessagePattern(Cart_Item_Created)
    async handleCartItemCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexCartitemCommand.create(data));
    }

    @MessagePattern(Cart_Item_Updated)
    async handleCartItemUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id, props } = data;
        await this.commandBus.execute(UpdateCartItemByIdCommand.create(id, props));
    }

    @MessagePattern(Cart_Item_Deleted)
    async handleCartItemDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id } = data;
        await this.commandBus.execute(DeleteCartItemByIdCommand.create(id));
    }

    @UseGuards(JwtAuthGuard)
    @Get("/cart/:id")
    async getCartById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchCartByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/cart")
    async searchCart(@Body() props: CartSearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchCartQuery.create(props, paging));
        const data = res.hits?.hits?.map((item) => item._source);
        const total = res.hits.total;

        return new PagingResponseDTO(data, total);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/cart-item/:id")
    async getCarItemtById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchCartItemByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/cart-item")
    async searchCartItem(@Body() props: CartItemSearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchCartItemQuery.create(props, paging));
        const data = res.hits?.hits?.map((item) => item._source);
        const total = res.hits.total;

        return new PagingResponseDTO(data, total);
    }
}
