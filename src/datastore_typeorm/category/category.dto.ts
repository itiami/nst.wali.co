import { ProductDto } from "../product/product.dto";

export class CategoryDto {
    id: number;
    name: string;
    productId: ProductDto[];
}

export class CreateCategoryDto {
    id: number;
    name: string;
    productId: ProductDto[];
}