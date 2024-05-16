import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from 'src/entity/product.entity';
import { Http2ServerResponse } from 'http2';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource('ProductConnection')
    private dataSource: DataSource
  ) {}

  async findOneById(id: number): Promise<Product | undefined> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const product = await queryBuilder.select(['product.price', 'product.name', 'product.invoice']).from(Product, 'product').where('product.id = :id', { id }).getOne();
      if (!product) {
        throw new NotFoundException('product not found.');
      }
      
      return product;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async create(data: Partial<Product>): Promise<boolean> {
    try {
      
      const queryBuilder = this.dataSource.createQueryBuilder();
      const result = await queryBuilder
        .insert()
        .into(Product)
        .values([{ price: data.price, name: data.name, invoice: data.invoice }])
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create product.');
    }
  }

  async delete(id: number): Promise<Boolean> {
    try {
      const product = await this.findOneById(id);
      if (!product) {
        return false;
      }
      
      const queryBuilder = this.dataSource.createQueryBuilder();
      await queryBuilder
        .delete()
        .from(Product, 'product')
        .where('product.id = :id', { id })
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete product.');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      return await queryBuilder.select(['product.id', 'product.price', 'product.name', 'product.invoice']).from(Product, 'product').getMany();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find products.');
    }
  }

  async findOneByInvoiceId(id: number): Promise<Product[] | undefined> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const products = await queryBuilder.select(['product.price', 'product.name', 'product.invoice']).from(Product, 'product').where('product.invoice = :id', { id }).getMany()
      if (!products) {
        throw new NotFoundException('product not found.');
      }
      
      return products;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
