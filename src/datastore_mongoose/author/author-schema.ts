import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from '../book/book-schema';
import { IBook } from '../book/book.interface';

@Schema()
export class Author {
    @Prop({ required: true })
    name: string;

    @Prop({})
    country: string;

    @Prop({})
    birthDate: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
    books: IBook["_id"][];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);


AuthorSchema.set("collection", "nst_author")