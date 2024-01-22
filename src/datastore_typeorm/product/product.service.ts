import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, ProductDto, UpdateProductDto } from './product.dto';
import { Category } from '../category/category.entity';
import { Stock } from '../stock/stock.entity';
import { CategoryDto, CreateCategoryDto } from '../category/category.dto';
import { StockDto } from '../stock/stock.dto';

@Injectable()
export class ProductService {
    findOne(arg0: number) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,

        @InjectRepository(Stock)
        private stockRepository: Repository<Stock>,

    ) { };


    // create new Product..
    async create(categoryDto: CategoryDto, productDto: ProductDto, stockDto: StockDto) {
        let category = await this.categoryRepository.findOne({ where: { name: categoryDto.name } });
        let product = await this.productRepository.findOne({ where: { name: productDto.name, stockId: productDto.stockId } });

        if (!category) {
            // create category
            let newCategory = this.categoryRepository.create(categoryDto);
            await this.categoryRepository.save(newCategory);
        }
        // create stock
        let newStock = this.stockRepository.create(stockDto);
        await this.stockRepository.save(newStock);

        // create product
        const newProduct = this.productRepository.create(productDto);
        newProduct.categoryId = category.id;
        newProduct.stockId = newStock.id;
        return await this.productRepository.save(newProduct);


        /* console.log({ category, product });
        return { category, product }; */

    }


    // find all product
    async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['nst_category'] })
    }


    /* // Retrieve a single product by ID
    async findOneDt(id: number): Promise<Product> {
        return this.productRepository.findOne(id);
    }

    // Update a product
    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.productRepository.update(id, updateProductDto);
        return this.productRepository.findOne(id);
    }

    // Delete a product
    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    } */

}
