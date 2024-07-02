import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Trim } from "src/custom-pipes/trim-transformer";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
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
