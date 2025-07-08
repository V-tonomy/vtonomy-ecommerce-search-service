import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserByIdCommand } from "../command";
import { SearchService } from "../../../../usecase";

@CommandHandler(UpdateUserByIdCommand)
export class UpdateByIdUserHandler implements ICommandHandler<UpdateUserByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: UpdateUserByIdCommand): Promise<boolean> {
        const props = command.props;
        const id = command.id;
        await this.searchService.update("user", id, props);
        return true;
    }
}
