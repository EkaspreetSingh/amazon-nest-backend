import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    productPrice: number

    @IsString()
    @IsOptional()
    productDescription: string

    @IsNumber()
    @IsNotEmpty()
    userId: number 
}
