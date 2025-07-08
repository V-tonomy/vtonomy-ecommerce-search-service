import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "../../../../usecase";
import { IndexCartCommand, IndexCartitemCommand } from "../command";

@CommandHandler(IndexCartCommand)
export class IndexCartHandler implements ICommandHandler<IndexCartCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexCartCommand): Promise<boolean> {
        const { id, ...data } = command.props;
        await this.searchService.index("cart", id, data);

        return true;
    }
}

@CommandHandler(IndexCartitemCommand)
export class IndexCartItemHandler implements ICommandHandler<IndexCartitemCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexCartitemCommand): Promise<boolean> {
        const { id, ...data } = command.props;
        await this.searchService.index("cart-item", id, data);

        return true;
    }
}
