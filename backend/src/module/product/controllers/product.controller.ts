import { Controller, Get, Post, Delete, Body, Param, HttpStatus, NotFoundException, Req, Res } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from 'src/entity/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('with-invoice/:invoiceId')
  async findAllByInvoiceId(@Param('invoiceId') id: number): Promise<Product[]> {
    const products = await this.productService.findOneByInvoiceId(id);
    if (!products) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post('add')
  async create(@Body() data: Partial<Product>, @Res() res: Response): Promise<{ status: HttpStatus, description: string }> {
    const response = this.productService.create(data);
    if (!response) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error' }
      }
      return { status: HttpStatus.CREATED, description: 'Created' }
  }


  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{
    statusCode: number,
    message: string,
  }> {
    const invoice = await this.productService.delete(id);
    if (!invoice) {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product not found',
          };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
