import { ICommand } from "@nestjs/cqrs";
import { CartItemUpdateDTO } from "../dto";

export class UpdateCartByIdCommand implements ICommand {
    id: string;
    props: any;

    constructor(id: string, props: any) {
        this.id = id;
        this.props = props;
    }

    static create(id: string, data: any) {
        return new UpdateCartByIdCommand(id, data);
    }
}

export class UpdateCartItemByIdCommand implements ICommand {
    id: string;
    props: CartItemUpdateDTO;

    constructor(id: string, props: CartItemUpdateDTO) {
        this.id = id;
        this.props = props;
    }

    static create(id: string, data: CartItemUpdateDTO) {
        return new UpdateCartItemByIdCommand(id, data);
    }
}
