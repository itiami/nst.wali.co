import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Paggination } from './paggination.schema';

@Injectable()
export class PagginationService {

    constructor(@InjectModel(Paggination.name, "mongoDB_Atlas") private readonly paggModel: Model<Paggination>) { };

    async findAllDoc(page: number, limit: number): Promise<any> {
        limit = limit < 100 ? limit : 100;
        const dt = await this.paggModel
            .find({}, { _id: false, sn: true, email: true }) // to set specific fields
            .limit(limit)
            .skip(page * limit)
            .exec();
        const totalRow = await this.paggModel.estimatedDocumentCount().then(res => res);
        const totalPage = Math.ceil(totalRow / limit);
        return { totalDoc: totalRow, pageTotal: totalPage, data: dt };
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


    // 
    async insetSerialAutoIncremental() {
        let counter = 1;
        (await this.paggModel.find()).forEach(doc => {
            this.paggModel.findOneAndUpdate(
                { _id: doc._id },
                { $set: { "sn": counter } }
            );
            counter++
        });

        return await this.paggModel.find().skip(150).limit(2);
    }

}
