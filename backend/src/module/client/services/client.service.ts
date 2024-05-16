import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Client } from 'src/entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectDataSource('ClientConnection')
    private dataSource: DataSource
  ) {}

  async findOneById(id: number): Promise<Client | undefined> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const client = await queryBuilder.select(['client.email', 'client.firstName', 'client.lastName']).from(Client, 'client').where('client.id = :id', { id }).getOne();
      if (!client) {
        throw new NotFoundException('Client not found.');
      }
      
      return client;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async create(clientData: Partial<Client>): Promise<boolean> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      const result = await queryBuilder
        .insert()
        .into(Client)
        .values([{ email: clientData.email, firstName: clientData.firstName, lastName: clientData.lastName }])
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create client.');
    }
  }

  async delete(id: number): Promise<Boolean> {
    try {
      const client = await this.findOneById(id);
      if (!client) {
        return false;
      }
      
      const queryBuilder = this.dataSource.createQueryBuilder();
      await queryBuilder
        .delete()
        .from(Client, 'client')
        .where('client.id = :id', { id })
        .execute();
      
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete client.');
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const queryBuilder = this.dataSource.createQueryBuilder();
      return await queryBuilder.select(['client.id', 'client.email', 'client.firstName', 'client.lastName']).from(Client, 'client').getMany();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find clients.');
    }
  }
}
