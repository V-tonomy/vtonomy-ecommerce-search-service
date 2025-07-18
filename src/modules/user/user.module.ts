import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RabbitmqModule } from "vtonomy";
import { SearchService } from "../../usecase";
import { USER_HANDLER } from "./core";
import { UserController } from "./infras/user.transport";

@Module({
    imports: [CqrsModule, RabbitmqModule],
    controllers: [UserController],
    providers: [SearchService, ...USER_HANDLER],
})
export class UserModule {}
