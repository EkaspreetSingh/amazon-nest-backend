import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Order } from '../entities/order.entity';
import { OrderItem } from 'src/modules/order-item/entities/orderItem';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class OrderRepository {
  constructor(
    private productService: ProductService,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize
  ) {}

  async createOrder(orderData: Partial<Order>, orderItemsData: Partial<OrderItem>[]): Promise<Order> {
    const transaction = await this.sequelize.transaction();
    try {
      const order = await Order.create(orderData, {
         transaction,
         include: [OrderItem] 
      });

      for (const itemData of orderItemsData) {
        const product = await this.productService.findProductById(itemData.productId)
        console.log(product);
        if(!product) {
          throw new HttpException(`Product with id ${itemData.productId} not found`, 404);
        }
        else 
        await OrderItem.create({ ...itemData, orderId: order.id }, { transaction });
      }

      await transaction.commit();

      const returnOrder = await this.findOrderById(order.id);
      console.log(returnOrder)
      return returnOrder;
    } catch (error) {
      await transaction.rollback();
      console.log(error.status)
      return error;
      throw new HttpException(error.response, error.status)
    }
  }

  async findAllOrders(query: any, offset: number, limit: number): Promise<Order[]> {
    return await Order.findAll({
      where: query,
      offset,
      limit,
      include: [OrderItem],
    });
  }

  async findOrderById(id: number): Promise<Order> {
    const result = await Order.findOne({ where: { id }, include: [OrderItem] });
    return result;
  }


  async deleteOrder(id: number): Promise<number> {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await Order.destroy({ where: { id } ,  transaction });
      await transaction.commit();
      return result;
    }
    catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
