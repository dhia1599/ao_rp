import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { Invoice } from 'src/entity/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice], 'InvoiceConnection')],
  controllers: [InvoiceController],
  providers: [InvoiceService ],
})
export class InvoiceModule {}
