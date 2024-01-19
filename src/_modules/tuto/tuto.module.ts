import { Module } from '@nestjs/common';
import { DataManupulationController } from './data-manupulation/data-manupulation.controller';
import { EnvInfoController } from './env-info/env-info.controller';
import { FileHandlingService } from './file_handling/file_handling.service';
import { FileHandlingController } from './file_handling/file_handling.controller';
import { PagginationController } from './paggination/paggination.controller';
import { PagginationService } from './paggination/paggination.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Paggination, PagginationSchema } from './paggination/paggination.schema';
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
