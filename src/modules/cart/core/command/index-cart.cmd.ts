import { ICommand } from "@nestjs/cqrs";
import { CartCreateDTO, CartItemCreateDTO } from "../dto";

export class IndexCartCommand implements ICommand {
    props: CartCreateDTO;

    constructor(props: CartCreateDTO) {
        this.props = props;
    }

    static create(data: CartCreateDTO) {
        return new IndexCartCommand(data);
    }
}

export class IndexCartitemCommand implements ICommand {
    props: CartItemCreateDTO;

    constructor(props: CartItemCreateDTO) {
        this.props = props;
    }

    static create(data: CartItemCreateDTO) {
        return new IndexCartitemCommand(data);
    }
}
