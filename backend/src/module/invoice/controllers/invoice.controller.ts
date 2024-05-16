import { Controller, Get, Post, Delete, Body, Param, HttpStatus, NotFoundException, Req, Res } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from 'src/entity/invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get('client-id/:id')
  async findAllByClientId(@Param('id') id: number): Promise<Invoice[]> {
    const invoice = await this.invoiceService.findOneByClientID(id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Invoice> {
    const invoice = await this.invoiceService.findOneById(id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  @Post('add')
  async create(@Body() data: Partial<Invoice>, @Res() res: Response): Promise<{ status: HttpStatus, description: string }> {
    const response = this.invoiceService.create(data);
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
    const invoice = await this.invoiceService.delete(id);
    if (!invoice) {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Invoice not found',
          };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'invoice deleted successfully',
    };
  }
}
