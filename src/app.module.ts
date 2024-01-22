import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './_modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbServiceProvider } from './_providers/mongodb-service-provider/mongodb-service-provider';
import { PostgresServiceProvider } from './_providers/postgres-service-provider/postgres-service-provider';
import { OracleServiceProvider } from './_providers/oracle-service-provider/oracle-service-provider';
import { TutoModule } from './_modules/tuto/tuto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from "src/_con/ormConfig";
import { MongooseModule } from '@nestjs/mongoose';
import { DatastoreMongooseModule } from './datastore_mongoose/datastore_mongoose.module';
import { DatastoreTypeormModule } from './datastore_typeorm/datastore_typeorm.module';
import { SharedModule } from './_shared/_shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env/.env', '.env/.env.default', '.env/.env.db'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets')
    }),
    AuthModule,
    TutoModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(process.env._NEST_MONGODB_DOCKER_STRING,
      { connectionName: "mongoDB_Docker" }),
    MongooseModule.forRoot(process.env._NEST_MONGODB_ATLAS_STRING,
      { connectionName: "mongoDB_Atlas" }),
    DatastoreMongooseModule,
    DatastoreTypeormModule,
    SharedModule,
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
