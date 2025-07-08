import { Module } from "@nestjs/common";
import { SearchService } from "src/usecase";
import { CoreModule } from "vtonomy";
import { PRODUCT_HANDLER } from "./core";
import { ProductController } from "./infras/product.transport";

@Module({
    imports: [CoreModule],
    controllers: [ProductController],
    providers: [SearchService, ...PRODUCT_HANDLER],
})
export class ProductModule {}
