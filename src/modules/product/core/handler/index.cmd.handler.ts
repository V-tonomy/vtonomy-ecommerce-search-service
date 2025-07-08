import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { IndexProductCommand } from "../command";

@CommandHandler(IndexProductCommand)
export class CreateProductHandler implements ICommandHandler<IndexProductCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexProductCommand): Promise<boolean> {
        const { id, ...data } = command.props;
        await this.searchService.index("product", id, data);

        return true;
    }
}
