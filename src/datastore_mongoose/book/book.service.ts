import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, IBook } from "./book-schema";
import { Author, IAuthor } from '../author/author-schema';
import { FactorInstance } from 'twilio/lib/rest/verify/v2/service/entity/factor';
import { AuthorDto, BookDto } from '../dto/book_author.dto';

@Injectable()
export class BookService {

    constructor(
        //@InjectModel('Book') private readonly bookModel: Model<IBook>,
        //@InjectModel('Author') private readonly authorModel: Model<IAuthor>

        @InjectModel(Book.name) private readonly bookModel: Model<Book>,
        @InjectModel(Author.name) private readonly authorModel: Model<Author>
    ) { }


    async findAll(book: BookDto): Promise<Book[]> {
        console.log(book);
        if (book.title) {
            console.log(book.title);
            return await this.bookModel.find({ book }).exec();
        } else {
            return await this.bookModel.find().exec();
        }
    }


    async findById(id: String): Promise<Book> {
        const bookDta = await this.bookModel.findById(id).exec();
        const dt = bookDta.populate('authorId');
        return dt;
    }

    async findByTitle(book: BookDto): Promise<Book> {
        const bookDta = await this.bookModel.findOne({ title: book.title });
        const dt = bookDta !== null ? bookDta.populate('authorId') : bookDta;
        return dt;
    }

    async findOneQryStr(title: string): Promise<Book[]> {
        const bookDta = await this.bookModel.find({ title: title }).exec();
        return bookDta;
    }


    async findOneAndAggregate(book: BookDto): Promise<any[]> {
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


    async addBookAndAuthor(book: BookDto, author: AuthorDto): Promise<any> {

        const getBook = await this.bookModel.findOne({ title: book.title }).exec();
        const getAuthor = await this.authorModel.findOne({ name: author.name }).exec();

        if (getAuthor === null) {

            const createAuthor = await this.authorModel.create(author);

            const addBook = await this.bookModel.create({
                authorId: createAuthor._id,
                title: book.title,
                genres: book.genres,
                datePublished: book.datePublished
            });

            createAuthor.books.push(addBook._id);
            createAuthor.save();
            addBook.save();
            return { bookId: addBook._id, authorId: createAuthor._id }
        } else if (getBook === null) {
            const addBook = await this.bookModel.create({
                authorId: getAuthor._id,
                title: book.title,
                genres: book.genres,
                datePublished: book.datePublished
            });
            getAuthor.books.push(addBook._id);
            addBook.save();
            getAuthor.save();
            return { bookId: addBook._id, authoId: getAuthor._id };
        } else {
            const dt = await this.bookModel.findById(getBook._id).populate("authorId").exec();
            return {
                msg: "Document Exists",
                doc: dt
            }
        };
    }

    async updateBook(id: string, book: BookDto): Promise<Book | Object> {
        const bookDta = await this.bookModel.findById(id).exec();
        if (bookDta !== null) {
            return this.bookModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        title: book.title,
                        genres: book.genres,
                        datePublished: book.datePublished
                    }
                },
                { new: true }
            );

        } else {
            return { isUpdated: false, msg: "not exists" }
        }
    }

    async deleteBook(id: string): Promise<Book | Object> {
        const bookDta = await this.bookModel.findById(id).exec();
        if (bookDta !== null) {
            const removeBook = await this.bookModel.findByIdAndDelete(id);
            const author = await this.authorModel.findById(bookDta.authorId);
            const countBooks = author.books.length;

            // to update data from books array, and __v in Author table 
            await this.authorModel.updateOne(
                { _id: bookDta.authorId },
                {
                    // this built-in $pull from mongoDb is use to take item from array
                    $pull: {
                        books: bookDta._id
                    },
                    // this built-in $set from mongoDb is use to set a new value
                    $set: {
                        country: "France",
                        __v: countBooks - 1
                    }
                },
                { new: true }
            ).exec();

            return {
                isDeleted: true,
                msg: "The Book has beed deleted",
                data: removeBook
            };

        } else {
            return { isDeleted: false, msg: "not exists" }
        }
    }

}
