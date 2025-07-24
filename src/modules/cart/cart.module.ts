import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RabbitmqModule } from 'vtonomy';
import { SearchService } from "../../usecase";
import { CART_HANDLER } from "./core";
import { CartController } from "./infras/cart.transport";

@Module({
    imports: [CqrsModule, RabbitmqModule],
    controllers: [CartController],
    providers: [SearchService, ...CART_HANDLER],
})
export class CartModule {}
