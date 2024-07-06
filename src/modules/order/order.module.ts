import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { OrderRepository } from './repositories/order.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [UserModule, DatabaseModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
