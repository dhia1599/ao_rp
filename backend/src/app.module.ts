import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrmDataSource } from './orm.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ClientModule } from './module/client/client.module';
import { InvoiceModule } from './module/invoice/invoice.module';
import { ProductModule } from './module/product/product.module';

const OrmModuleOptions: TypeOrmModuleOptions = {
  ...OrmDataSource.options,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  // migrationsRun: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`${process.cwd()}/.env`], isGlobal: true }),
    TypeOrmModule.forRoot({ ...OrmModuleOptions, name: 'AuthConnection' }),
    TypeOrmModule.forRoot({ ...OrmModuleOptions, name: 'UserConnection' }),
    TypeOrmModule.forRoot({ ...OrmModuleOptions, name: 'ClientConnection' }),
    TypeOrmModule.forRoot({ ...OrmModuleOptions, name: 'InvoiceConnection' }),
    TypeOrmModule.forRoot({ ...OrmModuleOptions, name: 'ProductConnection' }),
    AuthModule,
    UserModule,
    ClientModule,
    InvoiceModule,
    ProductModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
