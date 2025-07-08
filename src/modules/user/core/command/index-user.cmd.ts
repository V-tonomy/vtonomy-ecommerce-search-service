import { ICommand } from "@nestjs/cqrs";
import { UserCreateDTO } from "../dto";

export class IndexUserCommand implements ICommand {
    props: UserCreateDTO;

    constructor(props: UserCreateDTO) {
        this.props = props;
    }

    static create(data: UserCreateDTO) {
        return new IndexUserCommand(data);
    }
}
