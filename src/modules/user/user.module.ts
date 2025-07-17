import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CLIENTS } from "vtonomy";
import { SearchService } from "../../usecase";
import { USER_HANDLER } from "./core";
import { UserController } from "./infras/user.transport";

@Module({
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: CLIENTS.Auth_Client,
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL ?? "amqp://vtonomy:123456@localhost:5672"],
                    queue: "auth_queue",
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [SearchService, ...USER_HANDLER],
})
export class UserModule {}
