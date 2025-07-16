import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

import {
    JwtAuthGuard,
    PagingRequestDTO,
    PagingResponseDTO,
    ResponseDTO,
    User_Created,
    User_Deleted,
    User_Updated,
} from "vtonomy";
import { DeleteUserByIdCommand, IndexUserCommand, UpdateUserByIdCommand } from "../core/command";
import { UserSearchDTO } from "../core/dto";
import { SearchUserByIdQuery, SearchUserQuery } from "../core/query";

@Controller("search")
export class UserController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @MessagePattern(User_Created)
    async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.commandBus.execute(IndexUserCommand.create(data));
    }

    @MessagePattern(User_Updated)
    async handleUserUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id, props } = data;
        await this.commandBus.execute(UpdateUserByIdCommand.create(id, props));
    }

    @MessagePattern(User_Deleted)
    async handleUserDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        const { id } = data;
        await this.commandBus.execute(DeleteUserByIdCommand.create(id));
    }

    @UseGuards(JwtAuthGuard)
    @Get("/user/me")
    async me(@Req() req) {
        return new ResponseDTO(req.user);
    }

    @Get("/user/:id")
    async getUserById(@Param("id") id: string) {
        const res = await this.queryBus.execute(SearchUserByIdQuery.create(id));
        return new ResponseDTO(res);
    }

    @Post("/user")
    async searchUser(@Body() props: UserSearchDTO, @Query() paging: PagingRequestDTO) {
        const res = await this.queryBus.execute(SearchUserQuery.create(props, paging));
        const data = res.hits?.hits?.map((item) => item._source);
        const total = res.hits.total;

        return new PagingResponseDTO(data, total);
    }
}
