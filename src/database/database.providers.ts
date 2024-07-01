import { Sequelize } from 'sequelize-typescript';
import { OrderItem } from 'src/modules/order-item/entities/orderItem';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'ekaspreet',
        password: 'chaipassword',
        database: 'amazon',
      });
      sequelize.addModels([User, Order, OrderItem, Product]);
      // await sequelize.sync({force: true});
      await sequelize.sync();
      return sequelize;
    },
  },
];