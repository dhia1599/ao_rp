import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, NotFoundException, Req, Res } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from 'src/entity/client.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    const client = await this.clientService.findOneById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  @Post('add')
  async create(@Body() clientData: Partial<Client>, @Res() res: Response): Promise<{ status: HttpStatus, description: string }> {
    const response = this.clientService.create(clientData);
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
    const client = await this.clientService.delete(id);
    if (!client) {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Client not found',
          };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Client deleted successfully',
    };
  }
}
