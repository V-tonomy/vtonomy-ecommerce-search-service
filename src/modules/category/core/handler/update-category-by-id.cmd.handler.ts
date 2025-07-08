import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { UpdateCategoryByIdCommand } from "../command";

@CommandHandler(UpdateCategoryByIdCommand)
export class UpdateByIdCategoryHandler implements ICommandHandler<UpdateCategoryByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: UpdateCategoryByIdCommand): Promise<boolean> {
        const props = command.props;
        const id = command.id;
        await this.searchService.update("category", id, props);
        return true;
    }
}
