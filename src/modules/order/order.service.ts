import { HttpException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/orderItem';
import UserService from '../user/user.service';

@Injectable()
export class OrderService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  async create(createOrderDto: CreateOrderDto) : Promise<Order> {
    try {
      const user = await this.userService.getUserById(createOrderDto.userId)
      console.log(user);

      if(!user) {
        throw new HttpException(`User with id ${createOrderDto.userId} not found`, 404)
      }
      else {
        const newOrder = await Order.create({
          userId: createOrderDto.userId,
          price: createOrderDto.price,
          address: createOrderDto.address,
          orderItems: createOrderDto.orderItems,  
        }, {
          include: [OrderItem]
        });

        console.log(newOrder);
        return newOrder;
      }
    }
    catch (error) {
      console.log(error);
      // throw new Error('Error while creating order');
      throw new HttpException(`User with id ${createOrderDto.userId} not found`, 404)
    }


  }

  async findAll() {
    return await Order.findAll();
  }

  async findOne(id: number) {
    const res = await Order.findOne({where: {id: id}});
    // console.log("------------------------------------------------"+res)
    if(!res) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return res;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const res = await Order.update(updateOrderDto, {
      where: {id: id},
    });
    if(!res[0]) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return await Order.findOne({where: {id: id}});
  }

  async remove(id: number) {
    try {
      const numberOfDeletedRows = await Order.destroy({ where: {id: id} });;
      if (numberOfDeletedRows === 0) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
      return { message: `Order with id ${id} removed` };
    }
    catch (err) {
      return err.message
    }
  }

  async findOrdersByUserId(userId: number) {
    return await Order.findAll({where: {userId: userId}})
  }
}
