import { Test, TestingModule } from '@nestjs/testing';
import { PagginationService } from './paggination.service';

describe('PagginationService', () => {
  let service: PagginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagginationService],
    }).compile();

    service = module.get<PagginationService>(PagginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

