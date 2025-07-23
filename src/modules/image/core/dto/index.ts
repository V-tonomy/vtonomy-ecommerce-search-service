import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class ImageSearchDTO {
    @ApiProperty({ example: "product-id", description: "Image Id" })
    @IsOptional()
    id?: string[];

    @ApiProperty({ example: "Image 01", description: "Image name" })
    @IsOptional()
    productId?: string;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;
}
