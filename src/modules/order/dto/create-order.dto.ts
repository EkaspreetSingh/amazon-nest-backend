import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { OrderItem } from "src/modules/order-item/entities/orderItem";


export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    orderPrice: number;
  
    @IsString()
    orderAddress: string;
  
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    orderItems: OrderItem[];
}
