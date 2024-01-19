import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Paggination } from './paggination.schema';

@Injectable()
export class PagginationService {

    constructor(@InjectModel(Paggination.name, "mongoDB_Atlas") private readonly paggModel: Model<Paggination>) { };

    async findAll(limit: number) {
        console.log(limit);
        limit = limit < 10 ? limit : 10;
        const dt = await this.paggModel.find().limit(limit).exec();
        console.log(dt);
        return dt;
    }
    async findOneDoc() {
        const dt = await this.paggModel.findOne({
            sn: 0,
            fname: "Jerri",
            lname: "Cox",
        }).exec();
        console.log("FindOne: ", dt);
        return dt;
    }

}
