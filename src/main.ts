import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { PORTS } from "vtonomy";
import { SearchModule } from "./search.module";

async function bootstrap() {
    const app = await NestFactory.create(SearchModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
            queue: "search_queue",
            queueOptions: {
                durable: true,
            },
        },
    });

    await app.startAllMicroservices();
    await app.listen(PORTS.Search_Service);
}
bootstrap();
