import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { OrderItem } from '../../order-item/entities/orderItem';
import { User } from 'src/modules/user/user.entity';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  orderId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.FLOAT)
  orderPrice: number;

  @Column(DataType.STRING)
  orderAddress: string;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
