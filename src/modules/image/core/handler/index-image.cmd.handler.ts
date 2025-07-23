import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { IndexImageCommand } from "../command";

@CommandHandler(IndexImageCommand)
export class CreateImageHandler implements ICommandHandler<IndexImageCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexImageCommand): Promise<boolean> {
        const data = command.props
        await this.searchService.indexMany("image", data);

        return true;
    }
}
