import { Test, TestingModule } from '@nestjs/testing';
import { MongodbServiceProvider } from './mongodb-service-provider';

describe('MongodbServiceProvider', () => {
  let provider: MongodbServiceProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbServiceProvider],
    }).compile();

    provider = module.get<MongodbServiceProvider>(MongodbServiceProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
