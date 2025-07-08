import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { IndexCategoryCommand } from "../command";

@CommandHandler(IndexCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<IndexCategoryCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexCategoryCommand): Promise<boolean> {
        const { id, ...data } = command.props;
        await this.searchService.index("category", id, data);

        return true;
    }
}
