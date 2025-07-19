import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class ProductSearchDTO {
    @ApiProperty({ example: "product-id", description: "Product Id" })
    @IsOptional()
    id?: string[];

    @ApiProperty({ example: "Product 01", description: "Product name" })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: "category-id", description: "Category of product" })
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ example: "This is product description", description: "Product Description" })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 0, description: "From product price" })
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    fromPrice?: number;

    @ApiProperty({ example: 20000, description: "To product price" })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @IsOptional()
    toPrice?: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;
}
