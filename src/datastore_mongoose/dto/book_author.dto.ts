import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class BookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;
}

export class BookTitleDto {
    @ApiProperty({ type: () => BookDto })
    book: BookDto
}

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly author: string;
}

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    readonly title?: string;

    @IsMongoId()
    @IsOptional()
    readonly author?: string;
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