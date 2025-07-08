import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "../../../../usecase";
import { UpdateCartByIdCommand, UpdateCartItemByIdCommand } from "../command";

@CommandHandler(UpdateCartByIdCommand)
export class UpdateByIdCartHandler implements ICommandHandler<UpdateCartByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: UpdateCartByIdCommand): Promise<boolean> {
        const props = command.props;
        const id = command.id;
        await this.searchService.update("cart", id, props);
        return true;
    }
}

@CommandHandler(UpdateCartItemByIdCommand)
export class UpdateByIdCartItemHandler implements ICommandHandler<UpdateCartItemByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: UpdateCartItemByIdCommand): Promise<boolean> {
        const props = command.props;
        const id = command.id;
        await this.searchService.update("cart-item", id, props);
        return true;
    }
}
