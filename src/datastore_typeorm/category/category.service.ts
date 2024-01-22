import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { };

    async create(categoryDto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(categoryDto);
        return await this.categoryRepository.save(category);
    }

}
