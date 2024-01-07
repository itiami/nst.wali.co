import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDto, ProductDto } from './create.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly name: string;

    @IsNumber()
    readonly price: number;

    @IsString()
    @IsOptional()
    readonly description?: string;
}
