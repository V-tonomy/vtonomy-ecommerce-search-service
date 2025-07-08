import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserByIdCommand } from "../command";
import { SearchService } from "../../../../usecase";

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdHandler implements ICommandHandler<DeleteUserByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteUserByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("user", id);
        return true;
    }
}
