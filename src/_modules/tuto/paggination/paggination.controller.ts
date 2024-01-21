import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Request, Response } from "express";
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { PagginationService } from './paggination.service';
import { ApiBody, ApiConsumes, ApiHeader, ApiOkResponse, ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckBoxDto, MyDto, MyOptions } from './paggination.dto';
import { ILargeJson, ILargeJsonDoc } from './paggination.interface';

@ApiTags("Paggination")
@Controller('pagg')
export class PagginationController {

    constructor(private pagService: PagginationService) { };


    @ApiOperation({ summary: "Get Data From MongoDB Atlas Cloud" })
    @ApiQuery({ name: "page", example: 2 })
    @ApiQuery({ name: "limit", example: 50 })
    //@ApiQuery({ name: 'myCheckbox', type: Boolean, required: false, description: 'A sample checkbox parameter' })
    @Get()
    async findAllDt(
        @Query("page") page: number,
        @Query("limit") limit: number,
        @Query() checkbox: MyDto,
        @Res() res: Response,
    ) {
        try {
            console.log(checkbox.option);

            const data = await this.pagService.findAllDoc(+page, +limit);
            return res.status(201).json(data);
        } catch (err: any) {
            return res.status(404).json(err);
        }
    }



    @Get("findOne")
    async findOneDt(
        @Res() res: Response
    ) {
        const data = await this.pagService.findOneDoc();
        return res.status(201).json(data);
    }

    @ApiOperation({ summary: "MongoDB Cloud Atlas Create a field with auto incremental value" })
    @Get("sn")
    async autoIncrement(
        @Res() res: Response
    ) {
        try {
            const update = await this.pagService.insetSerialAutoIncremental();
            return res.status(201).json(update);
        } catch (err: any) {
            return res.status(201).json(err);
        }
    }


    @Get("jsonServer")
    async pag(
        @Res() res: Response
    ) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.jsonserver.io/jsonArray',
            headers: {
                'X-Jsio-Token': '5981e6a2b48960f877f17226cdb002e1'
            }
        };

        const fetchData = await axios.request(config)
            .then((response) => {
                console.log(response.data.length);

                return response.data
            })
            .catch((error) => {
                console.log(error);
            });

        return res.status(201).json(fetchData)
    }



    @ApiOperation({ summary: "MongoDB Cloud Atlas using Axios Library" })
    @Post("atlas")
    async atlas(
        @Body() body: any,
        @Res() res: Response
    ) {
        (await this.pagService.byAxios())
            .post("/action/find",
                {
                    dataSource: "Cluster0",
                    database: "cDB",
                    collection: "LargeJson",
                    sort: { "_id": -1 },
                    limit: 10,
                    filter: {}
                }
            )
            .then(results => {
                return res.status(201).send(results.data);
            })
            .catch((err: AxiosError) => {
                return res.status(404).send(err);
            });
    }

}



