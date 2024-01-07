import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './_modules/auth/auth.module';
import { ProductsModule } from './_modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbServiceProvider } from './_providers/mongodb-service-provider/mongodb-service-provider';
import { PostgresServiceProvider } from './_providers/postgres-service-provider/postgres-service-provider';
import { OracleServiceProvider } from './_providers/oracle-service-provider/oracle-service-provider';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env', 'env/.env.default', 'env/.env.db'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets')
    }),
    ProductsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MongodbServiceProvider,
    PostgresServiceProvider,
    OracleServiceProvider,

  ],
})

export class AppModule { }
