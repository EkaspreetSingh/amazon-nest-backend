import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsNotEmpty()
    userId: number 
}
