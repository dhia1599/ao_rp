import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Invoice } from 'src/entity/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectDataSource('InvoiceConnection')
    private dataSource: DataSource
  ) {}

  async findOneById(id: number): Promise<Invoice | undefined> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const invoice = await queryBuilder.select(['invoice.id', 'invoice.price', 'invoice.contact', 'client.firstName', 'client.lastName', 'client.email', 'client.phone'])
      .from(Invoice, 'invoice')
      .leftJoin('invoice.client', 'client')
      .where('invoice.id = :id', { id })
      .getOne();            
      
      if (!invoice) {
        throw new NotFoundException('invoice not found.');
      }
      
      return invoice;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async create(data: Partial<Invoice>): Promise<boolean> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const result = await queryBuilder
        .insert()
        .into(Invoice)
        .values([{ price: data.price, contact: data.contact, client: data.client }])
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create invoice.');
    }
  }

  async delete(id: number): Promise<Boolean> {
    try {
      const invoice = await this.findOneById(id);
      if (!invoice) {
        return false;
      }
      
      const queryBuilder = this.dataSource.createQueryBuilder();
      await queryBuilder
        .delete()
        .from(Invoice, 'invoice')
        .where('invoice.id = :id', { id })
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete invoice.');
    }
  }

  async findAll(): Promise<Invoice[]> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      return await queryBuilder.select(['invoice.id', 'invoice.price', 'invoice.contact', 'invoice.client']).from(Invoice, 'invoice').getMany();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find invoices.');
    }
  }

  async findOneByClientID(id: number): Promise<Invoice[] | undefined> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const invoice = await queryBuilder.select(['invoice.price', 'invoice.contact', 'invoice.client']).from(Invoice, 'invoice').where('invoice.client = :id', { id }).getMany();
      if (!invoice) {
        throw new NotFoundException('invoice not found.');
      }
      
      return invoice;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
