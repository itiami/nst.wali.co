import { Module } from '@nestjs/common';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book/book-schema';
import { AuthorSchema } from './author/author-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Book", schema: BookSchema }
    ], "mongoDB_Docker"),
    MongooseModule.forFeature([
      { name: "Author", schema: AuthorSchema }
    ], "mongoDB_Docker"),
  ],
  controllers: [AuthorController, BookController],
  providers: [AuthorService, BookService]
})
export class DatastoreMongooseModule { }
