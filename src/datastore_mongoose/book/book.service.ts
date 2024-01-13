import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from './book.interface';
import { Book } from "./book-schema";
import { IAuthor } from '../author/author.interface';
import { Author } from '../author/author-schema';

@Injectable()
export class BookService {

    constructor(
        @InjectModel('Book') private readonly bookModel: Model<IBook>,
        //@InjectModel(Book.name) private readonly bookSchema: Model<Book>,
        //@InjectModel('Author') private readonly authorModel: Model<IAuthor>
        @InjectModel(Author.name) private readonly authorModel: Model<Author>
    ) { }


    async findAll(book: Book): Promise<IBook[]> {
        console.log(book);
        if (book.title) {
            console.log(book.title);
            return await this.bookModel.find({ book }).exec();
        } else {
            return await this.bookModel.find().exec();
        }
    }


    async findById(id: String): Promise<IBook> {
        const bookDta = await this.bookModel.findById(id).exec();
        const dt = bookDta.populate('authorId');
        return dt;
    }

    async findByTitle(book: IBook): Promise<IBook> {
        const bookDta = await this.bookModel.findOne({ title: book.title });
        const dt = bookDta !== null ? bookDta.populate('authorId') : bookDta;
        return dt;
    }

    async findOneQryStr(title: string): Promise<IBook[]> {
        const bookDta = await this.bookModel.find({ title: title }).exec();
        return bookDta;
    }


    async findOneAndAggregate(book: Book): Promise<any[]> {
        const bookDta = await this.bookModel.findOne(book).exec();
        /* 
        aggregate(pipeline?: PipelineStage[], options?: AggregateOptions): Aggregate<any[]>
        */
        const dt = this.bookModel.aggregate([
            {
                $lookup: {
                    from: 'Author',
                    localField: '_id',
                    as: 'authors_book'

                }
            }
        ]);
        return dt;
    }


    async create(book: IBook, author: IAuthor): Promise<any> {

        const getBook = await this.bookModel.findOne({ title: book.title }).exec();
        const getAuthor = await this.authorModel.findOne({ name: author.name }).exec();

        if (getAuthor === null) {

            const createAuthor = await this.authorModel.create(author);

            const addBook = await this.bookModel.create({
                title: book.title,
                authorId: createAuthor._id
            });
            createAuthor.books.push(addBook._id);
            createAuthor.save();
            addBook.save();
            return { bookId: addBook._id, authorId: createAuthor._id }
        } else if (getBook === null) {
            const addBook = await this.bookModel.create({
                title: book.title,
                authorId: getAuthor._id
            });
            getAuthor.books.push(addBook._id);
            addBook.save();
            getAuthor.save();
            return { bookId: addBook._id, authoId: getAuthor._id }
        } else {
            const dt = await this.bookModel.findById(getBook._id).populate("authorId").exec();
            return {
                msg: "Document Exists",
                doc: dt
            }
        };

    }

    async update(id: string, book: Book): Promise<IBook> {
        return await this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return await this.bookModel.findByIdAndDelete(id).exec();
    }

}
