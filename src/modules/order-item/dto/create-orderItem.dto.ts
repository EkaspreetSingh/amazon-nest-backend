import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";


export class CreateOrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;
}