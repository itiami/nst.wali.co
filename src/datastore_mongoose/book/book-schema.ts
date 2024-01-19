import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { IAuthor } from '../author/author-schema';


export interface IBook extends Document {
    title: string;
    authorId: mongoose.Schema.Types.ObjectId;
    genres: string;
    datePublished: Date;
}

@Schema()
export class Book {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
    authorId: IAuthor | mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    genres: string;

    @Prop({ required: true, type: Date })
    datePublished: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);


BookSchema.set("collection", "nst_book")