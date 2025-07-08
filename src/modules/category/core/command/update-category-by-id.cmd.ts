import { ICommand } from "@nestjs/cqrs";

export class UpdateCategoryByIdCommand implements ICommand {
    id: string;
    props: any;

    constructor(id: string, props: any) {
        this.id = id;
        this.props = props;
    }

    static create(id: string, data: any) {
        return new UpdateCategoryByIdCommand(id, data);
    }
}
