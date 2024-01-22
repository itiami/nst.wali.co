import { CategoryDto } from "../category/category.dto";
import { StockDto } from "../stock/stock.dto";

export class ProductDto {
    id: number;
    price: number;
    name: string;
    stockId: number;
    categoryId: number;
}


// create-product.dto.ts
export class CreateProductDto {
    category: CategoryDto;
    product: ProductDto;
    stock: StockDto;
}

// update-product.dto.ts
export class UpdateProductDto {
    name?: string;
    price?: number;
    stockId: number;
    categoryId?: number;
}
