/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request, Response, query } from "express";
import { ProductCreateDto } from './dto/create.dto';
import { ProductUpdateDto } from './dto/update.dto';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
// the path will be http://192.168.1.200:3030/products
@Controller('products')
export class ProductsController {

    constructor(
        private productService: ProductsService,
        private config: ConfigService
    ) { };

    @Get()
    allProducts(
        @Res() res: Response,
    ) {
        const envData = this.config.get<string>('_NEST_DB_PORT');
        console.log("Data From Env: ", envData); // Data From Env:  27000
        return res.status(201).json(this.productService.allProduct())
    }


    // http://192.168.1.200:3030/products/specific?name=Hard%20Disk
    @Get('specific')
    queryParams(
        @Query('name') name: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        console.log(name);
        return res.status(201)
            .json(this.productService.filterProduct(name))
    }

    // http://192.168.1.200:3030/products/multi?name=Hard%20Disk&price=46
    @Get('multi')
    queryParamsMulti(
        @Query('name') qrStr1: string,
        @Query('price') qtStr2: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        console.log(qrStr1, qtStr2);
        return res.status(201)
            .json(this.productService.filterByMultiArg(qrStr1, qtStr2))
    }


    // http://192.168.1.200:3030/products/Hard%20Disk
    @Get(':name')
    @HttpCode(201)
    productsParam(
        @Param('name') productName: string,
        @Res() res: Response,
    ) {
        console.log(productName);
        return res.status(201).json(this.productService.filterProduct(productName))
    };



    @Post()
    productsByPostRequest(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: ProductCreateDto,
    ): any {
        console.log("req: ", req.body);
        console.log("@Body: ", body);
        return res.status(201).json(body)
        // or to get entire json object .. {filter}
    }


    @Post('createProduct')
    async createProduct(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: ProductCreateDto,
    ) {
        try {
            const product = await this.productService.createProduct(body);
            return res.status(201).json(product);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    @Put('updateProduct')
    async updateProduct(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: ProductUpdateDto,
    ) {
        try {
            const product = this.productService.updateProduct(req.body.id, req.body.update);
            return res.status(201).json(product);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    @Delete('deleteProduct')
    async deleteProduct() {

    }





}


