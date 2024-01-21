import { Body, Controller, Delete, Get, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import axios, { AxiosError } from 'axios';
import { PagginationService } from './paggination.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LargeJsonDto, MyDto, UpdateLargeJsonDto } from './paggination.dto';

@ApiTags("Axios with MongoDB Atlas")
@Controller('atlas')
export class PagginationController {

    constructor(private pagService: PagginationService) { };


    @ApiOperation({ summary: "MongooseModule - MongoDB Atlas FindAll with query page and limit" })
    @ApiQuery({ name: "page", example: 2 })
    @ApiQuery({ name: "limit", example: 50 })
    //@ApiQuery({ name: 'myCheckbox', type: Boolean, required: false, description: 'A sample checkbox parameter' })
    @ApiResponse({ description: "http://example.com/atlas?page=12499&limit=10" })
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


    @ApiOperation({ summary: "MongooseModule - MongoDB Atlas" })
    @Get("findOne")
    async findOneDt(
        @Res() res: Response
    ) {
        const data = await this.pagService.findOneDoc();
        return res.status(201).json(data);
    }

    @ApiOperation({ summary: "MongooseModule - MongoDB Cloud Atlas Create a field with auto incremental value" })
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

    @ApiOperation({ summary: "Fetch Data from - https://api.jsonserver.io using Axios Library" })
    @Get("axios_jsonServer")
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


    // Fetch Data from - MongoDB Cloud Atlas using Axios Library
    @ApiOperation({ summary: "Fetch Data from - MongoDB Cloud Atlas using Axios Library" })
    @ApiBody({})
    @Post("axios_FindAll")
    async axiosFindAllInAtlas(
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



    // Create Document in - MongoDB Cloud Atlas using Axios Library
    @ApiOperation({ summary: "Create using insertOne - MongoDB Cloud Atlas using Axios Library" })
    @ApiBody({ type: LargeJsonDto })
    @Post("axios_CreateDoc")
    async axiosCreateDocInAtlas(
        @Body() body: LargeJsonDto,
        @Res() res: Response
    ) {
        // find the last sn..
        const lastDt = await (await this.pagService.byAxios())
            .post("/action/find",
                {
                    dataSource: "Cluster0",
                    database: "cDB",
                    collection: "LargeJson",
                    sort: { "_id": -1 },
                    limit: 1,
                    filter: {}
                }
            ).then(dt => {
                return dt.data.documents
            });

        const lastSn = JSON.stringify(lastDt[0].sn);
        //return res.status(201).send(lastSn);
        if (lastSn) {
            body.sn = parseInt(lastSn) + 1;
            (await this.pagService.byAxios())
                .post("/action/insertOne",
                    {
                        dataSource: "Cluster0",
                        database: "cDB",
                        collection: "LargeJson",
                        document: body
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


    // Fetch Data from - MongoDB Cloud Atlas using Axios Library
    @ApiOperation({ summary: "UpdateOne Data from - MongoDB Cloud Atlas using Axios Library" })
    @ApiBody({ type: UpdateLargeJsonDto })
    @Put("axios_updateOne")
    async axiosUpdatefromAtlas(
        @Body() body: UpdateLargeJsonDto,
        @Res() res: Response
    ) {
        console.log(body.filterDt);
        // console.log(body.newValue);
        (await this.pagService.byAxios())
            .post("/action/updateOne",
                {
                    dataSource: "Cluster0",
                    database: "cDB",
                    collection: "LargeJson",
                    filter: body.filterDt,
                    update: {
                        $set: body.newValue
                    }
                }
            )
            .then(results => {
                return res.status(201).json(results.data);
            })
            .catch((err: any) => {
                return res.status(201).json(err);
            });
        //return (res.status(201).send(body)); // {"id": "640834a7f4400957974b1ecd"}
    }


    // Fetch Data from - MongoDB Cloud Atlas using Axios Library
    @ApiOperation({ summary: "Fetch Data from - MongoDB Cloud Atlas using Axios Library" })
    @ApiBody({})
    @Delete("axios_Delete")
    async axiosDeletefromAtlas(
        @Query('del') del: string,
        @Res() res: Response
    ) {
        (await this.pagService.byAxios())
            .post("/action/deleteOne",
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



