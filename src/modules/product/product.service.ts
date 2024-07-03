import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import UserService from '../user/user.service';

@Injectable()
export class ProductService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const user = await this.userService.getUserById(createProductDto.userId)

        if(user){
        const newProduct = await Product.create({
          userId: createProductDto.userId,
          name: createProductDto.name,
          price: createProductDto.price,
          description: createProductDto.description,  
        });
    
        // console.log(newProduct);
        return newProduct;
      }else{
        throw new HttpException("`User not found`", HttpStatus.NOT_FOUND);
      }
    }
    catch (error) {
      console.log(error);
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

  }

  async findAll() { 
    return await Product.findAll();
  }

  async findOne(id: number) {
    const res = await Product.findOne({where: {id: id}});
    if(!res) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    console.log(res);
    return res;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if(!(await Product.findOne({where: {id}}))) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const res = await Product.update(updateProductDto, {
      where: {id: id},
    });
    if(!res[0]) {
      throw new HttpException(`Object cannot be empty`, 400);
    }
    // console.log(res[0]);
    console.log(this.findOne(id));
    return this.findOne(id);
  }

  async remove(id: number) {
    try {
      const numberOfDeletedRows = await Product.destroy({ where: {id: id} });;
      if (numberOfDeletedRows === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return { message: `Product with id ${id} removed` };
    }
    catch (err) {
      return err.message
    }
  }

  async findProductsByUserId(userId: number) {
    return await Product.findAll({where: {userId: userId}});
  }
}
