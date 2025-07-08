import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { UpdateProductByIdCommand } from "../command";

@CommandHandler(UpdateProductByIdCommand)
export class UpdateByIdProductHandler implements ICommandHandler<UpdateProductByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: UpdateProductByIdCommand): Promise<boolean> {
        const props = command.props;
        const id = command.id;
        await this.searchService.update("product", id, props);
        return true;
    }
}
