import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { IMAGE_HANDLER } from "./core";
import { ImageController } from "./infras/image.transport";

@Module({
    imports: [CqrsModule],
    controllers: [ImageController],
    providers: [SearchService, ...IMAGE_HANDLER],
})
export class ImageModule {}
