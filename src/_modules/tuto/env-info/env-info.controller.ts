import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from "express";


@ApiExcludeController()
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
