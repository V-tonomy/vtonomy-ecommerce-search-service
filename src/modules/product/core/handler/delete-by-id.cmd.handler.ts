import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SearchService } from "src/usecase";
import { DeleteProductByIdCommand } from "../command";

@CommandHandler(DeleteProductByIdCommand)
export class DeleteProductByIdHandler implements ICommandHandler<DeleteProductByIdCommand> {
    constructor(private readonly searchService: SearchService) {}
    async execute(command: DeleteProductByIdCommand): Promise<boolean> {
        const id = command.id;
        await this.searchService.delete("product", id);
        return true;
    }
}
