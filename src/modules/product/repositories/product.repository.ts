import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { QueryProductDto } from '../dto/query-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await Product.create({
      userId: createProductDto.userId,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,  
    });
  }

  async findAll(queryProductDto: QueryProductDto): Promise<Product[]> {
    const { page, limit, name, price, userId } = queryProductDto;
    const offset = (page - 1) * limit;

    return Product.findAll({
      where: {
        ...name && { name: { [Op.eq]: name } },
        ...price && { price: { [Op.eq]: price } },
        ...userId && { userId: { [Op.eq]: userId } },
      },
      offset,
      limit,
    });
  }

  async findOne(id: number): Promise<Product> {
    return Product.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return Product.update(updateProductDto, {
      where: { id },
    });
  }

  async remove(id: number): Promise<number> {
    return Product.destroy({ where: { id } });
  }

  async findProductsByUserId(userId: number): Promise<Product[]> {
    return Product.findAll({ where: { userId } });
  }
}
