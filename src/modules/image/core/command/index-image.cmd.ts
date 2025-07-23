import { ICommand } from "@nestjs/cqrs";

export class IndexImageCommand implements ICommand {
    props: any;

    constructor(props : any) {
        this.props = props;
    }

    static create(data: any) {
        return new IndexImageCommand(data);
    }
}