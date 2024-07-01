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
    // try {
    //   const product = await Product.create(createProductDto);
    //   return product;
    // }
    // catch(err) {
    //   return err.message;
    // }

    try {
      const user = await this.userService.getUserById(createProductDto.userId)

        if(user){
        const newProduct = await Product.create({
          userId: createProductDto.userId,
          productName: createProductDto.productName,
          productPrice: createProductDto.productPrice,
          productDescription: createProductDto.productPrice,  
        });
    
        console.log(newProduct);
        return newProduct;
      }else{
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
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
    return await Product.findOne({where: {productId: id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await Product.update(updateProductDto, {
      where: {productId: id},
      returning: true,
    });
  }

  async remove(id: number) {
    try {
      const numberOfDeletedRows = await Product.destroy({ where: {productId: id} });;
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
