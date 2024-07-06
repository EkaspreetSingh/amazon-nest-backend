import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log({createOrderDto})
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() queryOrderDto: QueryOrderDto) {
    return this.orderService.findAll(queryOrderDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.orderService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.orderService.remove(+id);
  }
}
