import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, query } from "express";
import { TwilioVoip } from 'src/_providers/twilio-voip/twilio-voip';

@Controller('sms')
export class SmsController {

    constructor(
        private twilioVoipService: TwilioVoip,
        private config: ConfigService,
    ) { };

    @Get()
    async getTwilioInfo(
        @Res() res: Response,
    ) {
        console.log(this.twilioVoipService.getTwilioData());

        return res.status(201).send(await this.twilioVoipService.getTwilioData())
    }
}
