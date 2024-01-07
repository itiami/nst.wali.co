import { Test, TestingModule } from '@nestjs/testing';
import { OracleServiceProvider } from './oracle-service-provider';

describe('OracleServiceProvider', () => {
  let provider: OracleServiceProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OracleServiceProvider],
    }).compile();

    provider = module.get<OracleServiceProvider>(OracleServiceProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
