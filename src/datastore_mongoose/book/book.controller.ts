import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { IBook } from './book.interface';
import { BookService } from './book.service';
import { IAuthor } from '../author/author.interface';
import mongoose from 'mongoose';
import { title } from 'process';

@Controller('book')
export class BookController {

    constructor(private bookService: BookService) { };

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

    @Get()
    async findAll(
        @Body() body: any
    ) {
        return this.bookService.findAll(body);
    }


    // http://192.168.1.200:3030/book/query?id=65a0ffd98ad8e0cac0d0ce9e
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
