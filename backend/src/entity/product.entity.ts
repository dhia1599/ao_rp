import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Invoice)
  invoice: Invoice;
}
