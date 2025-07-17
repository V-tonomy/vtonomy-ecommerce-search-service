import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { CATEGORY_HANDLER } from "./core";
import { CategoryController } from "./infras/category.transport";

@Module({
    imports: [CqrsModule],
    controllers: [CategoryController],
    providers: [SearchService, ...CATEGORY_HANDLER],
})
export class CategoryModule {}
