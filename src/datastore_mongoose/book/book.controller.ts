import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";
import { IBook } from './book.interface';
import { BookService } from './book.service';
import mongoose from 'mongoose';
import { NactGuard } from 'src/_guard/nact/nact.guard';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookTitleDto, CreateBookDto, } from '../dto/book_author.dto';


@ApiTags("MongooseModule")
@Controller('book')
@UseGuards(NactGuard)
export class BookController {

    constructor(private bookService: BookService) { };

    @ApiOperation({ summary: "Add New Book" })
    @ApiBody({
        type: CreateBookDto,
        examples: {
            book: {
                value: {
                    "book": {
                        "title": "Ofiginal Fit"
                    },
                    "author": {
                        "name": "James",
                        "birthDate": "12/12/1965",
                        "country": "UK"
                    }
                }
            }
        }

    })
    @Post()
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: any,
    ) {
        if (body.book.title && body.author.name) {
            const addBook: any = await this.bookService.create(body.book, body.author);
            return res.status(201).json(addBook);
        } else {
            return res.status(404).json({ msg: "Required Data has not found" });
        }
    }

    @ApiOperation({ summary: "Find All Books" })
    @Get()
    async findAll(
        @Body() body: any
    ) {
        return this.bookService.findAll(body);
    }


    // http://192.168.1.200:3030/book/query?id=65a3072a8b95b3174cfdbe8f
    @ApiOperation({ summary: "using query param" })
    @ApiQuery({
        name: "id",
        example: "65a3072a8b95b3174cfdbe8f"
    })
    @Get("query")
    async byId(
        @Query('id') id: string,
        @Res() res: Response
    ) {
        if (mongoose.isValidObjectId(id)) {
            const data = await this.bookService.findById(id);
            console.log(data);
            return res.status(201).json(data);
        } else {
            return res.status(404).json({
                id: id,
                msg: "Incorrect MongoDB Object"
            })
        }
    }


    @ApiOperation({ summary: "Find Book By Title" })
    @ApiBody({
        type: BookTitleDto,
        examples: {
            book: {
                value: {
                    book: { title: "Java" }
                }
            }
        }

    })
    @ApiResponse({
        status: 201,
        description: "find Book by Title"
    })

    @Post("findByTitle")
    async findByName(
        @Body() body: any
    ) {
        return await this.bookService.findByTitle(body.book);
    }

    @Post("findOne")
    async findOne(@Body() body: any) {
        return await this.bookService.findOneAndAggregate(body.book);
    }


    // in url---  http://192.168.1.200:3030/book/travel
    @Get(":title")
    async findOneQueryStr(
        @Param('title') title: string
    ) {
        console.log(title);
        return await this.bookService.findOneQryStr(title);
    }


}
