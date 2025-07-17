import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CLIENTS } from "vtonomy";
import { SearchService } from "../../usecase";
import { CART_HANDLER } from "./core";
import { CartController } from "./infras/cart.transport";

@Module({
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: CLIENTS.Auth_Client,
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
                    queue: "auth_queue",
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [CartController],
    providers: [SearchService, ...CART_HANDLER],
})
export class CartModule {}
