import { Test, TestingModule } from '@nestjs/testing';
import { EnvInfoController } from './env-info.controller';

describe('EnvInfoController', () => {
  let controller: EnvInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvInfoController],
    }).compile();

    controller = module.get<EnvInfoController>(EnvInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
