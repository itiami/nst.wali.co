import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from "twilio";
import { ApplicationSid } from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class TwilioVoip {
    private twilioClient: Twilio;

    constructor(private config: ConfigService) {
        const appSid = this.config.get<string>('_TWILIO_ACCOUT_SID');
        const authToken = this.config.get<string>('_TWILIO_AUTH_TOKEN');
        this.twilioClient = new Twilio(appSid, authToken);
    };


    async getTwilioData() {
        return this.twilioClient;
    }
}
