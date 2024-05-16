import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Client } from './client.entity';
import { Product } from './product.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  contact: string;

  @ManyToOne(() => Client)
  client: Client;

  @OneToMany(() => Product, product => product.invoice)
  contained: Product[];
}
