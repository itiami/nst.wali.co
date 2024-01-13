import { Module } from '@nestjs/common';
import { DataManupulationController } from './data-manupulation/data-manupulation.controller';
import { EnvInfoController } from './env-info/env-info.controller';


@Module({
  imports: [],
  providers: [],
  controllers: [DataManupulationController, EnvInfoController,],

})
export class TutoModule { }
