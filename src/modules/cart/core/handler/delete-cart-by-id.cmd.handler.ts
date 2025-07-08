import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "../../../../usecase";
import { DeleteCartByIdCommand, DeleteCartItemByIdCommand } from "../command";

@CommandHandler(DeleteCartByIdCommand)
export class DeleteCartByIdHandler implements ICommandHandler<DeleteCartByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteCartByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("cart", id);
        return true;
    }
}
@CommandHandler(DeleteCartItemByIdCommand)
export class DeleteCartItemByIdHandler implements ICommandHandler<DeleteCartItemByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteCartItemByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("cart-item", id);
        return true;
    }
}
