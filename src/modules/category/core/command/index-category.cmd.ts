import { ICommand } from "@nestjs/cqrs";

export class IndexCategoryCommand implements ICommand {
    props: any;

    constructor(props : any) {
        this.props = props;
    }

    static create(data: any) {
        return new IndexCategoryCommand(data);
    }
}