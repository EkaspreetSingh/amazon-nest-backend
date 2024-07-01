import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import UserService from "./user.service";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/auth/auth.module";
import { ProductModule } from "../product/product.module";
import { OrderModule } from "../order/order.module";


@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule), forwardRef(() => ProductModule), forwardRef(() => OrderModule)],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule {};
