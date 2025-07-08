import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CLIENTS, CoreModule } from "vtonomy";
import { SearchService } from "../../usecase";
import { USER_HANDLER } from "./core";
import { UserController } from "./infras/user.transport";

@Module({
    imports: [
        CoreModule,
        ClientsModule.register([
            {
                name: CLIENTS.Auth_Client,
                transport: Transport.RMQ,
                options: {
                    urls: ["amqp://vtonomy:123456@localhost:5672"],
                    queue: "auth_queue",
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [SearchService, ...USER_HANDLER],
})
export class UserModule {}
