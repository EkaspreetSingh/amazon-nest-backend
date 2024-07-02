import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { OrderItem } from '../../order-item/entities/orderItem';
import { User } from 'src/modules/user/user.entity';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.FLOAT)
  price: number;

  @Column(DataType.STRING)
  address: string;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
