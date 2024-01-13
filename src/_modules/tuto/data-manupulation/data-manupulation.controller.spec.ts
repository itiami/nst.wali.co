import { Test, TestingModule } from '@nestjs/testing';
import { DataManupulationController } from './data-manupulation.controller';

describe('DataManupulationController', () => {
  let controller: DataManupulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataManupulationController],
    }).compile();

    controller = module.get<DataManupulationController>(DataManupulationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
