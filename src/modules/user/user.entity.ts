import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column
  phoneNo: string;

  @Column
  password: string;

  @Column
  isActive?: boolean;

  @Column
  role: string;

  @Column
  gender: string;

  @Column
  age?: number;

  @Column
  address?: string;

  @Column
  occupation?: string;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Product)
  products: Product[];
}
