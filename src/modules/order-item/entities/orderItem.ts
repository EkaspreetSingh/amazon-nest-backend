import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Order } from '../../order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  orderId: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;

  @Column(DataType.INTEGER)
  quantity: number;
}
