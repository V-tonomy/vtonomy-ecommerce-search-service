import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { DeleteImageByIdCommand } from "../command";

@CommandHandler(DeleteImageByIdCommand)
export class DeleteImageByIdHandler implements ICommandHandler<DeleteImageByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteImageByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("image", id);
        return true;
    }
}
