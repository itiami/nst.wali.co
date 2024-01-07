import { IsNumber } from 'class-validator';

export class ProductDeleteDto {
    @IsNumber()
    readonly id: number;
}
