import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { PRODUCT_HANDLER } from "./core";
import { ProductController } from "./infras/product.transport";

@Module({
    imports: [CqrsModule],
    controllers: [ProductController],
    providers: [SearchService, ...PRODUCT_HANDLER],
})
export class ProductModule {}
