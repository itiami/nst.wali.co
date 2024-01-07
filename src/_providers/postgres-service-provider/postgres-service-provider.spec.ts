import { Test, TestingModule } from '@nestjs/testing';
import { PostgresServiceProvider } from './postgres-service-provider';

describe('PostgresServiceProvider', () => {
  let provider: PostgresServiceProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresServiceProvider],
    }).compile();

    provider = module.get<PostgresServiceProvider>(PostgresServiceProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
