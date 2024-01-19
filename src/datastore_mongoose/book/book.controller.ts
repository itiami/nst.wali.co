import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";
import { BookService } from './book.service';
import mongoose from 'mongoose';
import { NactGuard } from 'src/_guard/nact/nact.guard';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDto, CreateBookDto, UpdateBookDto, } from '../dto/book_author.dto';


@ApiTags("MongooseModule")
@Controller('book')
@UseGuards(NactGuard)
export class BookController {

    constructor(private bookService: BookService) { };

    // Post Request Add Book and Author: 
    // http://192.168.1.200:3030/book
    @ApiOperation({ summary: "Add New Book" })
    @Post()
    async create(
        @Res() res: Response,
        @Body() body: CreateBookDto,
    ) {
        try {
            const addBook: any = await this.bookService.addBookAndAuthor(body.book, body.author);
            return res.status(HttpStatus.CREATED).json(addBook);
        } catch (err: any) {
            return res.status(HttpStatus.BAD_REQUEST).header('Error', err.message)
                .json({ msg: "Required Object Key not found" });
        }
    }



    // Get Request Find All: 
    // http://192.168.1.200:3030/book
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
    @ApiResponse({
        status: 201,
        description: 'http://ip_port/book/query?id=65a3072a8b95b3174cfdbe8f'
    })
    @Get("findById")
    async byId(
        @Query('id') id: string,
        @Res() res: Response
    ) {
        try {
            const data = await this.bookService.findById(id);
            return res.status(HttpStatus.CREATED).json(data);
        } catch (err: any) {
            return res.status(HttpStatus.BAD_REQUEST).header('Error', err.message)
                .json({ msg: "Required Object Key not found" });
        }
    }


    // http://192.168.1.200:3030/book/Java
    @ApiOperation({ summary: "Find Book By Title" })
    @ApiResponse({ status: 201, description: 'http://ip_port/book/Java' })
    @ApiBody({
        type: BookDto,
        examples: {
            book: {
                value: {
                    book: { title: "Java" }
                }
            }
        }

    })
    @Post("findByTitle")
    async findByName(
        @Body() body: any
    ) {
        return await this.bookService.findByTitle(body.book);
    }


    // // http://192.168.1.200:3030/book/
    @Post("findOne")
    async findOne(@Body() body: any) {
        return await this.bookService.findOneAndAggregate(body.book);
    }


    // http://192.168.1.200:3030/book/travel
    @Get(":title")
    async findOneQueryStr(
        @Param('title') title: string
    ) {
        console.log(title);
        return await this.bookService.findOneQryStr(title);
    }


    // http://192.168.1.200:3030/book/del/65a44c176e2e95f91069acac
    @ApiOperation({ summary: "Update Book" })
    @Put()
    async updateBook(
        @Body() body: UpdateBookDto,
        @Res() res: Response
    ) {
        if (mongoose.isValidObjectId(body.id)) {
            const result: any = await this.bookService.updateBook(body.id, body.update);
            return result.isDeleted ? res.status(201).json(result)
                : res.status(404).json(result);
        } else {
            return res.status(404).json({ msg: "Not a Valid MongoDB Object" })
        }
    }


    // http://192.168.1.200:3030/book/del/65a44c176e2e95f91069acac
    @ApiOperation({ summary: "Delete Book and Update Author Schema" })
    @ApiParam({ name: "id", example: "65a7f14789751b28c6064029" })
    @ApiResponse({
        status: 201,
        description: 'http://ip_port/book/del/65a7f14789751b28c6064029'
    })
    @Delete("del/:id")
    async deleteBook(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        if (mongoose.isValidObjectId(id)) {
            const result: any = await this.bookService.deleteBook(id);
            return result.isDeleted ? res.status(201).json(result) : res.status(404).json(result);
        } else {
            return res.status(404).json({ msg: "Not a Valid MongoDB Object" })
        }
    }


}
