import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


class Login {
    username: string;
    password: string;
};

class StreetNo {
    $numberInt: string;
}

class Personal {
    streetName: StreetNo;
    city: string;
    state: string;
    country: string;
}
class Work {
    streetNo: StreetNo;
    streetName: string;
    city: string;
    state: string;
    country: string;
}
class Address {
    personal: Personal;
    work: Work;
}

class Friend {
    name: string;
}



@Schema()
export class Paggination {
    @Prop({ type: Number })
    sn: Number;

    @Prop({ required: true })
    fname: string;

    @Prop({ required: true })
    lname: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    login: Login;

    @Prop({ required: true })
    phone: Number;

    @Prop({ required: true })
    photo: string;

    @Prop({ required: true })
    address: Address;

    @Prop({ required: true })
    greeting: string;

    @Prop({ required: true })
    friends: Friend[];

}

export const PagginationSchema = SchemaFactory.createForClass(Paggination);

PagginationSchema.set("collection", "LargeJson");

