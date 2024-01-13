import { Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from "express";

@Controller('env')
export class EnvInfoController {

    @Get()
    obj(
        @Res() req: Request,
        @Res() res: Response
    ) {
        const getEnv = process.env;
        console.log(getEnv);

        return res.status(201).send(getEnv)
    }
}
