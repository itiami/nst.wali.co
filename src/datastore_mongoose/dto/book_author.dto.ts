import { ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsDate, IsObject } from 'class-validator';
import { identity } from 'rxjs';

export class AuthorDto {
    name: string;
    birthDate: string;
    country: string;
    books: BookDto[] | string[];
}


export class BookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly genres: string;

    @ApiProperty({ type: Date })
    @IsDate()
    readonly datePublished: Date;
}



export class CreateBookDto {
    @ApiProperty({
        example: {
            title: "3 Wheel",
            genres: "Adventure",
            datePublished: "1965-12-24"

        }
    })
    @IsObject()
    readonly book: BookDto;

    @ApiProperty({
        example: {
            name: "James",
            birthDate: "12/12/1965",
            country: "UK"
        }
    })
    @IsObject()
    readonly author: AuthorDto;
}



export class UpdateBookDto {
    @ApiProperty({ example: "65a7f1a589751b28c606402f" })
    @IsMongoId()
    readonly id: string;

    // @ApiProperty(example: { title: "NestJS Advanced" })
    //or .. 
    @ApiProperty({
        example: {
            title: "NestJS Advanced",
            genres: "IT",
            datePublished: "1999-12-26"
        }
    })
    @IsObject()
    readonly update: BookDto;
}



export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
}


export class ResponseLinkDto {
    @ApiProperty({ example: 'https://192.168.1.200:3030/books' })
    link: string;
}