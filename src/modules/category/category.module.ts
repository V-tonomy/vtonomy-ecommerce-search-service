import { Module } from "@nestjs/common";
import { SearchService } from "src/usecase";
import { CoreModule } from "vtonomy";
import { CATEGORY_HANDLER } from "./core";
import { CategoryController } from "./infras/category.transport";

@Module({
    imports: [CoreModule],
    controllers: [CategoryController],
    providers: [SearchService, ...CATEGORY_HANDLER],
})
export class CategoryModule {}
