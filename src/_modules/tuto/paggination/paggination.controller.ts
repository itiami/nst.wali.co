import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from 'axios';
import { PagginationService } from './paggination.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Paggination")
@Controller('pagg')
export class PagginationController {

    constructor(private pagService: PagginationService) { };


    @ApiOperation({ summary: "Get Data From MongoDB Atlas Cloud" })
    @ApiQuery({ name: "page", example: 2 })
    @ApiQuery({ name: "limit", example: 50 })
    @Get()
    async findAllDt(
        @Query("page") page: number,
        @Query("limit") limit: number,
        @Res() res: Response
    ) {
        try {
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


    @Get("sn")
    async autoIncrement(
        @Res() res: Response
    ) {
        try {
            await this.pagService.insetSerialAutoIncremental();
            return res.status(201).json("Data Updated..");
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



    @Post("atlas")
    async atlas(
        @Body() body: any,
        @Res() res: Response
    ) {
        let data = JSON.stringify({
            "dataSource": "Cluster0",
            "database": "cDB",
            "collection": "LargeJson",
            "filter": {
                "_id": "640834a7f4400957974b1a6d"
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://data.mongodb-api.com/app/desisoft-bcrib/endpoint/desiSoft',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': '4GHVv9V1PovD7DNWiFPU3a6VzFA9eC7qPk5HTcXbG9fj6SBQWqgXV4eUiivExmSB',
                'Accept': 'application/json'
            },
            data: data
        };

        const fetchData = await axios.request(config)
            .then((response) => {
                console.log(response.data.document.length);
                return response.data.document.length;
            })
            .catch((error) => {
                console.log(error);
            });


        return res.status(201).json(fetchData);

    }




}
