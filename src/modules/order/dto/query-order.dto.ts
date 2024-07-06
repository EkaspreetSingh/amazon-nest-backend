import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";

export class QueryOrderDto {

    @IsNumber()
    @IsOptional()
    @Transform(({value})=>parseInt(value))
    userId?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value})=>parseInt(value))
    price?: number;

    @IsString()
    @IsOptional()
    address?: string;

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