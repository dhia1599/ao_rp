import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { Client } from 'src/entity/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client], 'ClientConnection')],
  controllers: [ClientController],
  providers: [ClientService ],
})
export class ClientModule {}
