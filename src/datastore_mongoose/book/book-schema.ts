import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Author } from '../author/author-schema';
import { IAuthor } from '../author/author.interface';

@Schema()
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
    authorId: IAuthor | mongoose.Schema.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);


BookSchema.set("collection", "nst_book")