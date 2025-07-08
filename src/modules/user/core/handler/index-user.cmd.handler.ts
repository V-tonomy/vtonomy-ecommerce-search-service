import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IndexUserCommand } from "../command";
import { SearchService } from "../../../../usecase";

@CommandHandler(IndexUserCommand)
export class IndexUserHandler implements ICommandHandler<IndexUserCommand> {
    constructor(private readonly searchService: SearchService) {}

    async execute(command: IndexUserCommand): Promise<boolean> {
        const { id, ...data } = command.props;
        await this.searchService.index("user", id, data);

        return true;
    }
}
