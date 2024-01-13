import { Document } from 'mongoose';
import { IBook } from '../book/book.interface';

export interface IAuthor extends Document {
    name: string;
    birthDate: string;
    country: string;
    books: IBook[] | string[];
}
