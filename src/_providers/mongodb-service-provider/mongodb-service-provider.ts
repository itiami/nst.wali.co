import { Injectable } from '@nestjs/common';
import mongoose, { MongooseError } from 'mongoose';
import { ConnectionOptions } from 'tls';

@Injectable()
export class MongodbServiceProvider {

    constructor() { }

    connectDB = async () => {

        const MONGODB_URI: string = `mongodb://${process.env._NEST_MONGODB_DOCKER_STRING}`;

        return await mongoose
            .connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectionOptions)
            .then((success) => {
                return success.connection.readyState; // return 0,1,2,3, or 99
            })
            .catch((error: MongooseError) => {
                if (error.message === "Authentication failed.") {
                    return "Please verify the the Database Server Connection String for username, password or DB name is connect";
                } else {
                    return "Please check the Database Server PORT and Host Address";
                }
            })
    }

    closeConnection = async () => {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
        } catch (err) {
            console.error('Error closing connection', err);
        }
    }

    connStatus = async () => {
        return mongoose.connection.readyState;
    }




}
