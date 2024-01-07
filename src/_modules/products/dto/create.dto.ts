import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
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


export class ProductCreateDto {
    @IsOptional()
    product: ProductDto;
}
