import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Paggination } from './paggination.schema';
import axios from 'axios';
import { ILargeJsonDoc } from './paggination.interface';

@Injectable()
export class PagginationService {

    constructor(@InjectModel(Paggination.name, "mongoDB_Atlas") private readonly paggModel: Model<Paggination>) { };

    async findAllDoc(page: number, limit: number): Promise<any> {
        limit = limit < 100 ? limit : 100;
        const dt = await this.paggModel
            .find({}, { _id: false, fname: true, email: true }) // to set specific fields
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
        // to update or insrt new field "sn" and put auto-increment value
        let counter = 1;
        (await this.paggModel.find()).forEach(doc => {
            this.paggModel.updateOne(
                { _id: doc._id },
                { $set: { "sn": counter } },
                { upsert: true }
            );
            counter++
        });

        // to delete the field "sn"
        //await this.paggModel.updateMany({}, { $unset: { "sn": "" } })


        return await this.paggModel
            .find({},
                {
                    _id: false, sn: true, fname: true
                }
            )
            .sort({
                _id: 1
            })
            .limit(10);

    }


    async byAxiosExample() {
        let collectionInfo = JSON.stringify({
            "dataSource": "Cluster0",
            "database": "cDB",
            "collection": "LargeJson",
            "sort": {
                "_id": -1
            },
            "limit": 5,
            "filter": {},
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-nlcrg/endpoint/data/v1/action/find',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': '4GHVv9V1PovD7DNWiFPU3a6VzFA9eC7qPk5HTcXbG9fj6SBQWqgXV4eUiivExmSB',
                'Accept': 'application/json',
                'app-id': 'desisoft-bcrib'
            },
            data: collectionInfo
        };

        /* const fetchData = await axios.request<ILargeJsonDoc>(config)
            .then((response) => {
                console.log(response.data.documents);
                return response.data.documents;
            })
            .catch((error) => {
                console.log(error);
            }); */

        const fetchData = await axios.request<ILargeJsonDoc>(
            config
        );
        return fetchData.data.documents;
    }


    async byAxios() {

        const fetchData = await axios.create({
            baseURL: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-nlcrg/endpoint/data/v1',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': '4GHVv9V1PovD7DNWiFPU3a6VzFA9eC7qPk5HTcXbG9fj6SBQWqgXV4eUiivExmSB',
                'Accept': 'application/json',
            }
        });

        return fetchData;
    }

}

// 