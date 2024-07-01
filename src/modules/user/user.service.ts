import { HttpException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import { QueryUserDto } from "./dto/query-user.dto";
import { Op } from "sequelize";
import { ProductService } from "../product/product.service";
import { OrderService } from "../order/order.service";

const saltOrRounds = 10;

@Injectable()
export default class UserService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,

    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService
  ) {}

  async isEmailAlreadyExists(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  async findAll(queryUserDto: QueryUserDto): Promise<User[]> {
    console.log(queryUserDto)
    if (queryUserDto) {
      const resultUser = await User.findAll({ 
        where: {
          ...(queryUserDto.role && {role:{[Op.eq]:queryUserDto.role}}),
          ...queryUserDto.age && {age:{[Op.eq]:queryUserDto.age}},
          ...queryUserDto.isActive && {isActive:{[Op.eq]:queryUserDto.isActive}},
          ...queryUserDto.gender && {gender:{[Op.eq]:queryUserDto.gender}},
        } 
      });
      if (!resultUser.length) {
        throw new NotFoundException(`Query does not match any user`);
      }
      return resultUser;
    } else {
      return User.findAll();
    }

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (await this.isEmailAlreadyExists(createUserDto.email)) {
        throw new HttpException(`User with email ${createUserDto.email} already exists`, 400);
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const newUser = await User.create({ ...createUserDto, password: hashedPassword });
      return newUser;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, 500);
    }
  }

  async getUserById(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await User.findOne({where:{email}});
    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {

      if (updateUserDto.email && await this.isEmailAlreadyExists(updateUserDto.email)) {
        throw new HttpException(`User with email ${updateUserDto.email} already exists`, 400);
      }
      const [numberOfAffectedRows, [updatedUser]] = await User.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (numberOfAffectedRows === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    }
    catch (err) {
      return err.message
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const numberOfDeletedRows = await User.destroy({ where: { id } });
      if (numberOfDeletedRows === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return { message: `User with id ${id} removed` };
    }
    catch (err) {
      return err.message
    }
  }

  async getAllProducts(id: number) {
    return await this.productService.findProductsByUserId(id);
  }
  
  async getAllOrders(id: number) {
    return await this.orderService.findOrdersByUserId(id);
  }
}