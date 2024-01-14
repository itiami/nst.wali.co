import { Module } from '@nestjs/common';
import { TwilioVoip } from 'src/_providers/twilio-voip/twilio-voip';
import { SmsController } from './sms/sms.controller';
@Module({
    providers: [TwilioVoip],
    controllers: [SmsController],
    imports: []
})
export class SharedModule { }
