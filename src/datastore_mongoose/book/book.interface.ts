import mongoose, { Document, ObjectId } from 'mongoose';

export interface IBook extends Document {
    title: string;
    authorId: mongoose.Schema.Types.ObjectId;
}
