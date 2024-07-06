import { Injectable, HttpException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import UserService from '../user/user.service';
import { OrderRepository } from './repositories/order.repository';
import { Order } from './entities/order.entity';
import { QueryOrderDto } from './dto/query-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.getUserById(createOrderDto.userId);
    if (!user) {
      throw new HttpException(`User with id ${createOrderDto.userId} not found`, 404);
    }

    try {
      const newOrder = await this.orderRepository.createOrder(
        {
          userId: createOrderDto.userId,
          price: createOrderDto.price,
          address: createOrderDto.address,
        },
        createOrderDto.orderItems
      );
      return newOrder;
    } catch (error) {
      console.error(error);
      throw new HttpException(`Error while creating order`, 500);
    }
  }

  async findAll(queryOrderDto: QueryOrderDto) {

    // console.log(queryOrderDto)

    const { page, limit, userId, price, address } = queryOrderDto;
    const offset = (page - 1) * limit;

    const query = {
      ...userId && { userId },
      ...price && { price },
      ...address && { address },
    };

    // console.log(query);

    return await this.orderRepository.findAllOrders(query, offset, limit);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }


  async remove(id: number) {
    const numberOfDeletedRows = await this.orderRepository.deleteOrder(id);
    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return { message: `Order with id ${id} removed` };
  }

  async findOrdersByUserId(userId: number) {
    return await this.orderRepository.findAllOrders({ userId }, 0, Infinity);
  }
}
