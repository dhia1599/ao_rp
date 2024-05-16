import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrmDataSource } from './orm.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ClientModule } from './module/client/client.module';

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
    AuthModule,
    UserModule,
    ClientModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
