import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from "express";



@ApiExcludeController()
@Controller('data-manipulation')
export class DataManupulationController {

    @Get()
    obj(
        @Res() req: Request,
        @Res() res: Response
    ) {
        const obj = { a: 1, b: 2, c: 3 };
        const objArr = [["a", 1], ["b", 2], ["c", 3]];
        const entries = Object.entries(obj);

        entries.forEach((el, i) => {
            console.log(el); // [["a",1],["b",2],["c",3]]
        })

        console.log(Object.fromEntries(objArr)); // { a: 1, b: 2, c: 3 }

        console.log("...............");

        const input = {
            name: 'John',
            age: 30,
            hobbies: ['Reading', 'Hiking'],
            address: {
                street: '123 Main St',
                city: 'Exampleville',
            },
        };

        const transformFn = (value: any) => {
            Object.entries(value).forEach(el => {
                if (typeof el[1] === "string") {
                    console.log(el[1]);
                } else {
                    console.log(typeof el[1]);

                }

            })
        };

        console.log(transformFn(input));

        return res.status(201).json({
            entries
        })
    }

    @Get('deleteFromArr')
    deleteArr() {
        return deleteFromArray();
    }

}


function searchProduct(productName: String) {
    return getAllProducts().forEach((item: any) => {
        if (item.name === productName) {
            return item;
        }
    });
}

function getAllProducts() {
    return [
        {
            "name": "SSD",
            "price": 120.0
        },
        {
            "name": "Keyboard",
            "price": 40.0
        },
        {
            "name": "Mouse",
            "price": 54.0
        }
    ];
}

function deleteFromArray() {
    const arr = ["65a422a8ebbcfa55a9238e27", "65a422b2ebbcfa55a9238e2d", "65a422bcebbcfa55a9238e33"];
    const arrFilter = arr.filter((vel) => vel !== "65a422b2ebbcfa55a9238e2d");
    const arrMap = arr.map((vel) => vel !== "65a422b2ebbcfa55a9238e2d");
    return {
        filter: arrFilter,
        map: arrMap
    }
}