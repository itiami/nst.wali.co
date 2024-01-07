import { Module } from '@nestjs/common';
import { SmsController } from './sms/sms.controller';
import { TwilioVoip } from 'src/_providers/twilio-voip/twilio-voip';

@Module({
  controllers: [SmsController],
  providers: [
    TwilioVoip,
  ]
})
export class AuthModule { }
