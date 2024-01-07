import { Test, TestingModule } from '@nestjs/testing';
import { TwilioVoip } from './twilio-voip';

describe('TwilioVoip', () => {
  let provider: TwilioVoip;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwilioVoip],
    }).compile();

    provider = module.get<TwilioVoip>(TwilioVoip);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
