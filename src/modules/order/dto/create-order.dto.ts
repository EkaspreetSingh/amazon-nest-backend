import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/modules/order-item/dto/create-orderItem.dto";
// import { OrderItem } from "src/modules/order-item/entities/orderItem";


export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;
  
    @IsString()
    address: string;
  
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
}
