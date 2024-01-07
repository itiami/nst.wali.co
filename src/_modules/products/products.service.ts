/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { nestedData, simpleJson } from "./data/data";
import { ProductCreateDto, ProductDto } from './dto/create.dto';
import { ProductUpdateDto } from './dto/update.dto';

@Injectable()
export class ProductsService {

    dt = simpleJson;

    allProduct() {
        return this.dt
    }

    // filter returns an array of all matched item
    filterProduct(str: string) {
        return this.dt.filter((el) => {
            return el.name === str;
        });
    }

    filterByMultiArg(str: string, str2: string) {
        return this.dt.filter((el) => {
            return el.name === str && el.price === Number(str2);
        });
    }

    // find return an object of the first matched item
    findProduct(str: string) {
        return this.dt.find((el) => {
            return el.name === str;
        });
    }


    createProduct(prodData: ProductCreateDto) {
        let newProduct = { ...prodData.product };
        let isData = this.dt.find(el => el.id === prodData.product.id);
        if (!isData) {
            this.dt.push(newProduct)
            //console.log(newProduct);
            return newProduct;
        } else {
            //console.log({ msg: "Data Exists" });
            return { msg: "Data Exists" }
        }
    }


    updateProduct(id: number, updatedData: ProductUpdateDto) {
        this.dt.map(el => {
            if (el.id === id) {
                return { id, ...updatedData }
            }
        });


    }


    deleteProduct(id: number) {

    };
}
