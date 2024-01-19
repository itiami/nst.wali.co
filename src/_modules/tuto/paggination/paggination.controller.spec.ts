import { Test, TestingModule } from '@nestjs/testing';
import { PagginationController } from './paggination.controller';

describe('PagginationController', () => {
  let controller: PagginationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagginationController],
    }).compile();

    controller = module.get<PagginationController>(PagginationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
