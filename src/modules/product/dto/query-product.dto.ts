import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";


export class QueryProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    limit?: number = 10;
}