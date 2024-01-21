import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    username: string;
    password: string;
};


export class StreetNoDto {
    $numberInt: string;
}

export class PersonalDto {
    streetName: StreetNoDto;
    city: string;
    state: string;
    country: string;
}
export class WorkDto {
    streetNo: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
}
export class AddressDto {
    personal: PersonalDto;
    work: WorkDto;
}

export class FriendDto {
    name: string;
}

export class LargeJsonDto {
    sn: string;
    fname: string;
    lname: string;
    gender: string;
    company: string;
    email: string;
    login: LoginDto
    phone: string;
    photo: string;
    address: AddressDto;
    greeting: string;
    friends: FriendDto[]
}



export class Page_LimitDto {
    page: number;
    limit: number;
}


export class CheckBoxDto {
    @ApiProperty({ description: 'Example checkbox', default: false })
    exampleCheckbox: boolean;
}


export enum MyOptions {
    Option1 = 'Option1',
    Option2 = 'Option2',
    Option3 = 'Option3',
}

export class MyDto {
    @ApiProperty({ enum: MyOptions, enumName: 'MyOptions' })
    option: MyOptions;
}
