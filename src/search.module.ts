import { Module } from "@nestjs/common";
import { CartModule } from "./modules/cart/cart.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductModule } from "./modules/product/product.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        CategoryModule,
        UserModule,
        ProductModule,
        CartModule
    ],
})
export class SearchModule {}
