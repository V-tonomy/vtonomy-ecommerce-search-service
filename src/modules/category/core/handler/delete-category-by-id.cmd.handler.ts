import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { DeleteCategoryByIdCommand } from "../command";

@CommandHandler(DeleteCategoryByIdCommand)
export class DeleteCategoryByIdHandler implements ICommandHandler<DeleteCategoryByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteCategoryByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("category", id);
        return true;
    }
}
