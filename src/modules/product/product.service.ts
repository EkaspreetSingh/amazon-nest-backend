import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import UserService from '../user/user.service';
import { QueryProductDto } from './dto/query-product.dto';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const user = await this.userService.getUserById(createProductDto.userId);

      if (user) {
        const newProduct = await this.productRepository.create(createProductDto);
        return newProduct;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(queryProductDto: QueryProductDto) {
    return this.productRepository.findAll(queryProductDto);
  }

  async findOne(id: number) {
    const res = await this.productRepository.findOne(id);
    if (!res) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    console.log(res);
    return res;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!(await this.productRepository.findOne(id))) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const res = await this.productRepository.update(id, updateProductDto);
    if (!res[0]) {
      throw new HttpException(`Object cannot be empty`, 400);
    }
    console.log(await this.productRepository.findOne(id));
    return this.productRepository.findOne(id);
  }

  async remove(id: number) {
    try {
      const numberOfDeletedRows = await this.productRepository.remove(id);
      if (numberOfDeletedRows === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return { message: `Product with id ${id} removed` };
    } catch (err) {
      return err.message;
    }
  }

  async findProductsByUserId(userId: number) {
    return this.productRepository.findProductsByUserId(userId);
  }

  async findProductById(productId: number) {
    const product = await this.productRepository.findOne(productId);
    if(!product) return null

    return product;
  }
}
