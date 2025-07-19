import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PORTS, QueueConfig } from "vtonomy";
import { SearchModule } from "./search.module";

async function bootstrap() {
    const app = await NestFactory.create(SearchModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle("Search Service")
        .setDescription("API for managing search service in Vtonomy")
        .setVersion("1.0")
        .addTag("Search")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL ?? "amqp://vtonomy:123456@localhost:5672"],
            queue: "search_queue",
            queueOptions: QueueConfig.Search_Client,
        },
    });

    await app.startAllMicroservices();
    await app.listen(PORTS.Search_Service);
}
bootstrap();
