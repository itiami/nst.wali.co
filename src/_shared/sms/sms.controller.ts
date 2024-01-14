import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response, query } from "express";
import { TwilioVoip } from 'src/_providers/twilio-voip/twilio-voip';

@ApiTags("Twilio SMS Module")
@Controller('shared/sms')
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


    @Post()
    async sendApi(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { msg, to } = req.body.smsBody;
        this.twilioVoipService.sendSms(to, msg)
            .then(message => {
                console.log(message);
                return res.status(201).json(message);
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(201).json(err)
            });
    }
}
