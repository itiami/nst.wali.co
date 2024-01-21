import { Module } from '@nestjs/common';
import { DataManupulationController } from './data-manupulation/data-manupulation.controller';
import { EnvInfoController } from './env-info/env-info.controller';
import { FileHandlingService } from './file_handling/file_handling.service';
import { FileHandlingController } from './file_handling/file_handling.controller';
import { PagginationController } from './axios_example/paggination.controller';
import { PagginationService } from './axios_example/paggination.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Paggination, PagginationSchema } from './axios_example/paggination.schema';
import { Connection } from 'mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Paggination.name, schema: PagginationSchema }
    ], "mongoDB_Atlas"),
    Connection,

  ],
  providers: [FileHandlingService, PagginationService],
  controllers: [DataManupulationController, EnvInfoController, FileHandlingController, PagginationController,],

})
export class TutoModule { }
