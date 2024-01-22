import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {


    constructor(private categoryService: CategoryService) { };

    @Post()
    async createCatagory(
        @Body() body: any
    ) {
        const category = await this.categoryService.create(body);
        return category;
    }
}
